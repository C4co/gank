export const gamesTrending = (page: number = 1) => {
  return {
    params: {
      key: process.env.API_KEY,
      search_precise: true,
      dates: '2021-11-01,2021-11-30',
      page_size: 40,
      page: page,
      discover: true,
      ordering: '-relevance'
    }
  }
}

export const game = {
  params: {
    key: process.env.API_KEY
  }
}

export const genres = {
  params: {
    key: process.env.API_KEY
  }
}

export const platforms = {
  params: {
    key: process.env.API_KEY
  }
}
