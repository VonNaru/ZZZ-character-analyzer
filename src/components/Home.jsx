import maluImage from '/pictures/malu_tuh.jpg'

export default function Home() {
  return (
  <div style={{ color: 'white'}}>

      <h1>Halaman Home</h1>
      <p>Selamat datang di halaman utama!</p>
      <input type="file" />
      <img src={maluImage} alt="Malu" style={{ maxWidth: '400px' }} />
  </div>
  )
}
  
