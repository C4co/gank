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

export const last30Days = (page: number = 1) => {
  return {
    params: {
      key: process.env.API_KEY,
      ordering: '-added',
      page_size: 40,
      page: page,
    }
  }
}

export const bestOfTheYear = (page: number = 1, year: number = 2020) => {
  return {
    params: {
      key: process.env.API_KEY,
      discover: true,
      ordering: '-added',
      page_size: 40,
      page: page,
      year: year
    }
  }
}

export const allTimeTop = (page: number = 1) => {
  return {
    params: {
      key: process.env.API_KEY,
      discover: true,
      page_size: 40,
      page: page
    }
  }
}

export const calendar = (page: number = 1) => {
  return {
    params: {
      key: process.env.API_KEY,
      popular: true,
      page: page,
      page_size: 40
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
    key: process.env.API_KEY,
    page_size: 40
  }
}

export const genreGames = (page: number = 1) => {
  return {
    params: {
      key: process.env.API_KEY,
      page_size: 40,
      page: page
    }
  }
}

export const platforms = (page: number = 1) => {
  return {
    params: {
      key: process.env.API_KEY,
      page: page,
      page_size: 40
    }
  }
}
