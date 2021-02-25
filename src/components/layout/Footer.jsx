const Footer = () => {
  return (
    <footer className="center p-1">
      <strong>
        <p>
          &copy; {new Date().getFullYear()} by{' '}
          <a href="https://github.com/nmudd037" target="_blank" rel="noopener noreferrer">
            MNR.
          </a>{' '}
          All rights reserved.
        </p>
      </strong>
    </footer>
  );
};

export default Footer;
