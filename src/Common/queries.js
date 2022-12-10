// Anilist

export const anilistNotAiringScheduleQuery = (
  page = 1,
  perPage = 20,
) =>
  `query { 
  Page(page: ${page}, perPage: ${perPage}) { 
    pageInfo { 
      total 
      perPage 
      currentPage 
      lastPage 
      hasNextPage
    } 
    airingSchedules( notYetAired: true) { 
      airingAt 
      episode 
      media { 
        id
        description
        idMal
        title { 
          romaji
          english
          userPreferred
          native
        } 
        countryOfOrigin
        description
        popularity
        bannerImage
        coverImage { 
          large 
          color 
        } 
        genres
        averageScore
        seasonYear
        format
      } 
    }
  }
}`;
