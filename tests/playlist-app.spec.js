import { Playlist } from '../pages/playlist-app.page.js'
import { test } from '@playwright/test'

test.describe('Playlist App Tests', () => {
  let playlistPage

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    playlistPage = new Playlist(page)
  })

  test('Search Functionality', async () => {
    await playlistPage.searchTrack()
  })

  test('Add Track to Playlist', async () => {
    await playlistPage.addAllTracksToPlaylist()
  })

  test('Calculate tracks duration', async () => {
    await playlistPage.addAllTracksToPlaylist()
    await playlistPage.calculateTracksDuration()
  })
})