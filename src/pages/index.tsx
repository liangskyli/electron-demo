import VersionUpdate from '@/components/version-update';
import yayJpg from '../assets/yay.jpg';

export default function HomePage() {
  console.log('HomePage:', { HomePage: 1 });

  return (
    <div>
      <VersionUpdate />
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
