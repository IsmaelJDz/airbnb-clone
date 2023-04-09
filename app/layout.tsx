import { Nunito } from 'next/font/google';
import './globals.css';
import NavBar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone built with Next.js',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <Modal actionLabel='Submit' title='hello world!!' isOpen />
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
