using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ForMember(dto => dto.PhotoUrl
                , opt => opt.MapFrom(x => x.Photos.FirstOrDefault(y => y.IsMain).Url)).ForMember(
                    dto => dto.Age, opt => opt.MapFrom(x => x.DateOfBirth.CalculateAge())
                );
            CreateMap<User, UserForDetailedDto>().ForMember(dto => dto.PhotoUrl
                , opt => opt.MapFrom(x => x.Photos.FirstOrDefault(y => y.IsMain).Url)).ForMember(
                    dto => dto.Age, opt => opt.MapFrom(x => x.DateOfBirth.CalculateAge())
                );
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}