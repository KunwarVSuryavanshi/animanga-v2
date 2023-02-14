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
          date.getFullYear() + "" + (date.getMonth()+1 > 9 ? (date.getMonth()+1) : '0'+(date.getMonth()+1)) + "" + (date.getDate() > 9 ? date.getDate() : '0'+date.getDate())
        }, sort: POPULARITY_DESC, isAdult: false){
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
        media(countryOfOrigin: JP, status: RELEASING, sort: TRENDING_DESC, type: ANIME, isAdult: false){
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
          status
        }
      }
    }`;
};

export const topAnime = (
  page = 1,
  type = "ANIME",
  status = "FINISHED",
  sort = "SCORE_DESC"
) => {
  return `{ 
      Page(page: ${page}, perPage: 50) { 
        pageInfo { 
          total 
          perPage 
          currentPage 
          lastPage 
          hasNextPage
        } 
        media(countryOfOrigin: JP, status: ${status}, sort: ${sort}, type: ${type}){
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
          status
        }
      }
    }`;
};

export const searchAnime = (page = 1, perPage = 50, searchText) => {
  // console.log(page, per)
  return `query { 
      Page(page: ${page}, perPage: ${perPage}) { 
        pageInfo { 
          total 
          perPage 
          currentPage 
          lastPage 
          hasNextPage
        } 
        media(search: "${searchText}", sort: POPULARITY_DESC, isAdult: false){
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
            color
          },
          format,
      		averageScore,
      		id,
      		idMal,
          type
        }
      }
    }`;
};
