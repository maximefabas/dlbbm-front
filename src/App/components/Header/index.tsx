import { Component, JSX } from 'preact'

class Header extends Component<{}, {}> {
  render (): JSX.Element|null {
    return <div className='header'>
      <h1>De la bien bonne musique.</h1>
    </div>
  }
}

export default Header
