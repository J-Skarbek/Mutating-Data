import logo from '@/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  // console.log(logo); -- display the properties on logo object
  return (
    <header id="main-header">
      <Link href="/">
        {/* Note: you can rewrite the height and height by using the width and height props -- although,
        it's not recommended -- instead use the 'sizes prop' */}
        <Image 
          src={logo} 
          sizes='5vw'
          // The 'Priority prop can disable lazy loading, which happens
          // by default -- this is good in cases like logos in the header/etc.
          priority
          // width={100} 
          // height={100} 
          alt='Mobile phone with posts feed on it' 
        />
        {/* Note the difference between the src prop -- by using the Image component, you
        Need to reference the entire 'logo' object, not just the .src property */}
        {/* <img src={logo.src} alt="Mobile phone with posts feed on it" /> */}
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className='cta-link' href="/new-post">New Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
