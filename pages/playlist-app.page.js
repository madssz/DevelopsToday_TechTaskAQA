import { expect } from '@playwright/test'

export class Playlist {
  constructor(page) {
    this.page = page
    this.searchInput = '[id=":r0:"]'
    this.trackLocator = (trackName) => `p:has-text("${trackName}")`
    this.addButton = 'button:has-text("+")'
    this.trackDurations = '#tracklist .MuiGrid-container div:nth-child(3) p'
    this.playlistSection = '#playlist p'
    this.playlistDuration = '#playlist-duration'
  }

  async searchTrack(trackName = 'Summer Breeze') {
    await this.page.fill(this.searchInput, trackName)
    await expect(this.page.locator(this.trackLocator(trackName))).toBeVisible()
    await expect(this.page.locator(this.trackLocator('Autumn Leaves'))).toHaveCount(0)
    await this.page.click(this.addButton)
    await expect(
      this.page.locator(`${this.playlistSection}:has-text("${trackName}")`)
    ).toBeVisible()
    await this.page.fill(this.searchInput, '')
  }

  async addAllTracksToPlaylist() {
    const addButtons = await this.page.locator(this.addButton).all()
    for (const button of addButtons) {
      await button.click()
      await expect(button).toBeVisible()
    }
  }

  async calculateTracksDuration() {
    const totalDurationInSeconds = (
      await this.page.locator(this.trackDurations).allTextContents()
    )
      .map((time) => time.split(':').map(Number))
      .reduce((sum, [min, sec]) => sum + min * 60 + sec, 0)

    const displayedTotalInSeconds = parseInt(
      (await this.page.locator(this.playlistDuration).textContent())?.match(/\d+/)?.[0] || '0',
      10
    )

    expect(totalDurationInSeconds).toBe(displayedTotalInSeconds)
  }
}