import Input from "@/Components/Input";
import Main from "@/Components/TokoTemplate/Main";



const TokoProdukCreate = () => {
  return (
    <>

      <div>
        <h1 className="font-bold text-3xl">Toko Admin List</h1>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div>
          <label>Nama Produk</label>
          <Input placeholder="Nama Produk" />
        </div>
        <div>
          <label>Kategori Toko</label>
          <Input placeholder="Kategori Toko" />
        </div>
        <div>
          <label>Kategori Global</label>
          <Input placeholder="Kategori Global" />
        </div>
        <div>
          <label>Satuan Jual</label>
          <Input placeholder="Satuan Jual" />
        </div>
        <div>
          <label>Harga Jual</label>
          <Input placeholder="Harga Jual" />
        </div>
        <div>
          <label>Harga Beli</label>
          <Input placeholder="Harga Beli" />
        </div>
        <div>
          <label>Harga Diskon</label>
          <Input placeholder="Harga Beli" />
        </div>
        <div>
          <label>Tanggal Awal Diskon</label>
          <Input type="date" />
        </div>
        <div>
          <label>Tanggal Akhir Diskon</label>
          <Input type="date" />
        </div>
      </div>

      {/* gambar */}
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div>
          <label>Gambar Utama</label>
          <Input type="file" />
        </div>
        <div>
          <label>Gambar Lain</label>
          <Input type="file" />
        </div>
        <div>
          <label>Gambar Lain</label>
          <Input type="file" />
        </div>
        <div>
          <label>Gambar Lain</label>
          <Input type="file" />
        </div>
      </div>

      <div className="mt-2">
        <a href="/toko-list" className="bg-gray-700 text-white hover:bg-gray-800 p-2 rounded-md">Kembali</a>
        <button className="rounded-md bg-blue-500 text-white hover:bg-blue-600 p-2 ml-3">Tambah</button>
      </div>
    </>
  );
}

TokoProdukCreate.layout = (page) => <Main children={page} />;

export default TokoProdukCreate;
