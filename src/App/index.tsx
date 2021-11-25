import { Component, JSX } from 'preact'
import Header from './components/Header'
import Posts from './components/Posts'
import './styles.scss'

export const rootUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://maximefabas.github.io/dlbbm'

export interface SongData {
  type: 'song'
  artist_name?: string
  song_title?: string
  is_live?: boolean
  live_venue?: string
  live_date?: string
  source?: 'youtube'
  url?: string
}

export interface PlaylistData {
  type: 'playlist'
  title?: string
  songs: SongData[]
}

export type JsonData = Array<SongData|PlaylistData>

export interface State {
  json_loading: boolean
  json_data: JsonData|null
  json_error: any
}

export default class App extends Component<{}, State> {
  state: State = {
    json_loading: false,
    json_data: null,
    json_error: null
  }

  constructor (props: {}) {
    super(props)
    this.fetchData = this.fetchData.bind(this)
  }
  
  componentDidMount () {
    this.fetchData()
  }

  async fetchData (): Promise<void> {
    this.setState(curr => ({ ...curr, json_loading: true }))
    try {
      const headers = { 'Content-Type': 'application/json' }
      const res = await window.fetch(`${rootUrl}/data.json`, { headers })
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
      const data = await res.json()
      this.setState(curr => ({
        ...curr,
        json_loading: false,
        json_data: data as JsonData,
        json_error: null
      }))
    } catch (error) {
      this.setState(curr => ({
        ...curr,
        json_loading: false,
        json_error: error
      }))
    }
  }

  render (): JSX.Element|null {
    const { state } = this
    console.log(state)
    return <div className='app'>
      <Header />
      <Posts data={state.json_data} />
    </div>
  }
}
