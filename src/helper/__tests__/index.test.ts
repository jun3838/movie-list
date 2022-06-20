import { toggleFavourite } from "..";
import 'jest-localstorage-mock'
import { Favourite } from "../../types";

test('should set localStorage "favourites" correctly', () => {
  const sampleData = [
    {"title":"Amazing Spiderman Syndrome","year":2012,"imdbId":"tt2586634"},
    {"title":"Waterworld","year":2001,"imdbId":"tt0381702"},
    {"title":"Judge Rummy's Miscue","year":1919,"imdbId":"tt0370819"}
  ]
  // setting up localStorage
  localStorage.setItem('favourites', JSON.stringify(sampleData))

  let favourites: Favourite[] = []
  // removing
  toggleFavourite(sampleData, { title: 'Amazing Spiderman Syndrome', year: 2012, imdbId: 'tt2586634'})
  favourites = JSON.parse(localStorage.getItem('favourites') as string)
  expect(favourites.find(item => item.imdbId === 'tt2586634')).toBeUndefined()
  expect(favourites.length).toEqual(2)

  // adding
  toggleFavourite(sampleData, { title: 'Amazing Spiderman Syndrome', year: 2012, imdbId: 'tt2586634'})
  favourites = JSON.parse(localStorage.getItem('favourites') as string)
  expect(favourites).toContainEqual({
    title: 'Amazing Spiderman Syndrome',
    year: 2012,
    imdbId: 'tt2586634'
  })
  expect(favourites.length).toEqual(3)
})