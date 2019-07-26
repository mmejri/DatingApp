using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _configuration;
        public AuthController(IAuthRepository repo, IConfiguration configuration)
        {
            _configuration = configuration;
            _repo = repo;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();
            if (await _repo.UserExists(userForRegisterDto.UserName))
                return BadRequest("user already exists");
            var userToCreate = new User
            {
                Username = userForRegisterDto.UserName
            };
            var createdUser = _repo.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            //Verify Credentials
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();
            var claims = new Claim[]{
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userForLoginDto.Username.ToLower())
            };
            var descriptor = new SecurityTokenDescriptor();
            descriptor.Expires = DateTime.Now.AddDays(1);
            descriptor.SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)), 
                    SecurityAlgorithms.HmacSha512Signature);
            descriptor.Subject = new ClaimsIdentity(claims);
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(descriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });


        }

    }
}