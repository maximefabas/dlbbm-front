import { Component, JSX } from 'preact'
import { SongData } from '../..'

interface Props {
  data: SongData
}

class Song extends Component<Props, {}> {
  render (): JSX.Element|null {
    const { data } = this.props

    const rendered = (() => {
      if (data.url === undefined) return null
      if (data.source === 'youtube') return <iframe
        src={data.url}
        style={{ width: '60vw', height: '45vw' }} />
    })()

    return <div className='song'>{rendered}</div>
  }
}

export default Song
