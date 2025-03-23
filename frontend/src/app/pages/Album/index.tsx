import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './index.module.css'; 

const Cadastro: React.FC = () => {
  const navigate = useNavigate(); 

  const [step1, setStep1] = useState(true);
  const [songs, setSongs] = useState<number[]>([]);
  const [albumName, setAlbumName] = useState("");
  const [genero, setGenero] = useState("");
  const [subgenero, setSubgenero] = useState("");
  const [songsName, setSongsName] = useState<string[]>([]);
  const [songsPaths, setPaths] = useState<string[]>([]);
  const [login, setLogin] = useState("raul");
  const [feat, setFeat] = useState("");

  const handleCancel = () => {
    alert("Cancelado!");
  };

  const handleContinue = () => {
    const input = document.getElementById("albumsongs") as HTMLInputElement;
    const numSongs = parseInt(input.value);
    const mysongs = Array.from({ length: numSongs }, (_, i) => i + 1);
    setSongs(mysongs);
    setSongsName(new Array(numSongs).fill(""));
    setPaths(new Array(numSongs).fill(""));
    setStep1(false);
  };

  const handleVoltar = () => {
    setStep1(true);
  };

  const handleSongNameChange = (index: number, value: string) => {
    const updatedSongsName = [...songsName];
    updatedSongsName[index] = value;
    setSongsName(updatedSongsName);
  };

  const handleCadastroAlbum = async () => {
    const album = {
      name: albumName, 
      genero: genero,
      subgenero: subgenero,
      songs: songsName,
      songs_paths: songsPaths,
      artist_login: login,
      feat: feat
    };
  
    try {
      const response = await fetch("http://localhost:5001/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar album");
      }
  
      const data = await response.json();
      alert("Album cadastrado com sucesso!");
      navigate(`/artists/${login}`)
      console.log(data);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar album!");
    }
  };
  
  return (
    <div className={styles['cadastro-container']}>
      <div className={step1 ? styles['step1']: styles['hiddenstep']}> 
        <div className={styles['black-box']}>
          <p className={styles['title']}>TUDO PRONTO PARA SEU NOVO LANÇAMENTO!</p>
        </div>
        <div className={styles['form-container']}>
          <div className={styles['album-cover-container']}>
            <p className={styles['font-bold']}>Capa do álbum</p>
            <div className={styles['album-cover']}></div>
          </div>
          <div className={styles['text-left']}>
            <p className={styles['font-bold']}>Nome do novo lançamento</p>
            <input className={styles['form-input']} 
              value={albumName} 
              onChange={(e) => setAlbumName(e.target.value)} 
            />
            <p className={styles['font-bold']}>Quantidade de Músicas</p>
            <input type="range" min="1" max="15" id="albumsongs" className={styles['range-input']} />
            <div className={styles['input-group']}>
              <div className={styles['text-input-group']}>
                <p className={styles['font-bold']}>Gênero</p>
                <input className={styles['form-input-b']} 
                  value={genero} 
                  onChange={(e) => setGenero(e.target.value)} 
                />
              </div>
              <div className={styles['text-input-group']}>
                <p className={styles['font-bold']}>Subgênero</p>
                <input className={styles['form-input-b']} 
                  value={subgenero} 
                  onChange={(e) => setSubgenero(e.target.value)} 
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles['final-buttons']}>
          <button className={styles['a-button']} onClick={handleCancel}>Cancelar</button>
          <button className={styles['a-button']} onClick={handleContinue}>Continuar</button>
        </div>
      </div>
      <div className={step1 ? styles['hiddenstep'] : styles['step2'] }>
        <div className={styles['uploadbox']}>
          {songs.map((num, index) => (
            <div key={num} className={styles['music-row']}>
              <label className={styles['font-bold']}>Música {num}</label>
              <input 
                type="text" 
                className={styles['input-song']} 
                placeholder={`Nome ${num}`} 
                value={songsName[index] || ""}
                onChange={(e) => handleSongNameChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="album-box">
          <p>Album</p>
          <div className="album-placeholder"></div>
        </div>
        <div className={styles['final-buttons']}>
          <button className={styles['b-button']} onClick={handleVoltar}>Voltar</button>
          <button className={styles['b-button']} onClick={handleCadastroAlbum}>Lançar</button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
