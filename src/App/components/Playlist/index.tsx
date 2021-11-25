import { Component, JSX } from 'preact'
import { PlaylistData } from '../..'

interface Props {
  data: PlaylistData
}

class Playlist extends Component<Props, {}> {
  render (): JSX.Element|null {
    return <div className='playlist'>Playlist</div>
  }
}

export default Playlist
