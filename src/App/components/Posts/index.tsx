import { Component, JSX } from 'preact'
import { JsonData } from '../..'
import Song from '../Song'
import Playlist from '../Playlist'

interface Props {
  data?: JsonData
}

interface State {
  page: number
}

class Posts extends Component<Props, State> {
  state: State = {
    page: 0
  }

  constructor (props: Props) {
    super(props)
    this.goToNextPage = this.goToNextPage.bind(this)
  }

  goToNextPage () {
    this.setState(curr => ({ ...curr, page: curr.page + 1 }))
  }

  render (): JSX.Element|null {
    const { props, state } = this
    const { data } = props

    const postsInPage = data?.slice(0, (state.page + 1) * 10)

    return <div className='posts'>
      {postsInPage?.map(post => post.type === 'song'
        ? <Song data={post} />
        : <Playlist data={post} />)}
      <button onClick={this.goToNextPage}>Load 10 more.</button>
    </div>
  }
}

export default Posts
