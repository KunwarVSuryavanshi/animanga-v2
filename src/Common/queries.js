// Anilist

export const anilistNotAiringScheduleQuery = (date, page = 1, perPage = 50) => {
  return `query { 
      Page(page: ${page}, perPage: ${perPage}) { 
        pageInfo { 
          total 
          perPage 
          currentPage 
          lastPage 
          hasNextPage
        } 
        media(countryOfOrigin: JP, status: NOT_YET_RELEASED, type: ANIME, startDate_greater: ${
          date.getFullYear() + "" + date.getMonth() + "" + date.getDate()
        }){
          title {
            romaji
            english
            native
            userPreferred
          },
          startDate {
            year
            month
            day
          },
          trailer {
            id
          },
          coverImage {
            extraLarge
            large
            medium
            color
          },
        }
      }
    }`;
};
export const airingToday = (page = 1, perPage = 50) => {
  return `query { 
      Page(page: ${page}, perPage: ${perPage}) { 
        pageInfo { 
          total 
          perPage 
          currentPage 
          lastPage 
          hasNextPage
        } 
        media(countryOfOrigin: JP, status: RELEASING, sort: TRENDING_DESC, type: ANIME){
          id,
          idMal,
          type,
          format,
          description,
          startDate {
            year
            month
            day
          },
          endDate {
            year
            month
            day
          },
          episodes,
          duration,
          title {
            romaji
            english
            userPreferred
          },
          coverImage {
            extraLarge
            large
            color
          },
          bannerImage,
          genres,
          averageScore,
          nextAiringEpisode {
            id
          }
        }
      }
    }`;
};

//   `query {
//   Page(page: ${page}, perPage: ${perPage}) {
//     pageInfo {
//       total
//       perPage
//       currentPage
//       lastPage
//       hasNextPage
//     }
//     airingSchedules( notYetAired: true, sort: TIME) {
//       airingAt
//       episode
//       media {
//         id
//         description
//         idMal
//         title {
//           romaji
//           english
//           userPreferred
//           native
//         }
//         countryOfOrigin
//         description
//         popularity
//         bannerImage
//         coverImage {
//           large
//           color
//         }
//         genres
//         averageScore
//         seasonYear
//         format
//       }
//     }
//   }
// }`;
