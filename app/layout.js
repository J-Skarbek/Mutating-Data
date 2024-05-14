import Header from '@/components/header';
import './globals.css';

export const metadata = {
  title: 'NextPosts',
  description: 'Browse and share amazing posts.',
};

//The idea of posting metadata in a layout file is so it can be a fallback
//for any pages w/o metadata, or, could also be seen as taking this info,
//and merging it with any other metadata provided from any given page

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
