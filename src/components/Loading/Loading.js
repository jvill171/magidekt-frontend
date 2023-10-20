
import "./Loading.scss"


const Loading = ({showText = false, breakCount = 0}) =>{

  const lineBreaks = [];
  for (let i = 0; i < breakCount; i++) {
    lineBreaks.push(<br key={i} />);
  }

    return(
      <>
        <h1 className="Loading">
        {showText && <span>Loading... </span>}
        {lineBreaks}
          <i className="ms ms-g"></i>
          <i className="ms ms-u"></i>
          <i className="ms ms-r"></i>
          <i className="ms ms-w"></i>
          <i className="ms ms-b"></i>
        </h1>
      </>
    )
}

export default Loading;