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
        }, sort: START_DATE, isAdult: false){
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
        media(countryOfOrigin: JP, status: RELEASING, sort: POPULARITY_DESC, type: ANIME, isAdult: false){
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

export const topAnime = (page = 1, type = 'ANIME') => {
  return `{ 
      Page(page: ${page}, perPage: 50) { 
        pageInfo { 
          total 
          perPage 
          currentPage 
          lastPage 
          hasNextPage
        } 
        media(countryOfOrigin: JP, status: FINISHED, sort: SCORE_DESC, type: ${type}){
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
        media(search: "${searchText}", sort: SCORE_DESC, isAdult: false){
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
          format,
      		averageScore,
      		id,
      		idMal
        }
      }
    }`;
};
