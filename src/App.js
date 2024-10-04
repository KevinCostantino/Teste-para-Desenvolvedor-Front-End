import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import styles from './App.css';
import PurchaseModal from './PurchaseModal';
import styles2 from './Product.module.css'; 

function App() {
  const [data, setData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal
  const userToken = '2A50C22E-7954-4C73-9CF9-F6D298C047A7'; // Substitua pelo seu token

  // GET para obter os dados da API
  useEffect(() => {
    fetch('https://api-candidate.ogruposix.com/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-token': userToken,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText} (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      if (data.object && data.object.length > 0) {
        setData(data.object[0]); // Armazena o primeiro item no estado
      }
    })
    .catch(error => {
      console.error('Erro ao obter os dados:', error);
    });
  }, [userToken]);

  // Função para lidar com a abertura do modal de compra
  const handlePurchaseClick = (productId) => {
    setSelectedProduct(productId); // Define o produto selecionado
    setIsModalOpen(true); // Abre o modal de compra
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  // Extrair ID do vídeo do YouTube a partir da URL
  function getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const videoId = getVideoId(data?.video_url);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1 className={styles2.titulo}>{data.video_headline}</h1>
        {data.video_sub_headline && <h2 className={styles2.subtitulo}>{data.video_sub_headline}</h2>}
      </header>

      <section>
        <div className={styles.videoContainer}>
        <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + videoId}
            title="Vídeo Promocional"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      <section>
        <ProductList products={data.products} onSelectProduct={handlePurchaseClick} />
      </section>

      {isModalOpen && (
        <PurchaseModal
          productId={selectedProduct} // Passa o produto selecionado
          onClose={closeModal}
          userToken={userToken} // Passa o token de usuário
        />
      )}
    </div>
  );
}

export default App;