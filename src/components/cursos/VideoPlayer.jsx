export default function VideoPlayer({ url }) {
  return (
    <div className="conteudo-video">
      <div className="conteudo-video-wrap">
        <iframe
          src={url}
          title="Vídeo da aula"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
