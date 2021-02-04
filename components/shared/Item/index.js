const Item = ({dateOfReceiving, content}) => {
  return (
    <div
      className={'block'}>
      <span>{dateOfReceiving}</span>
      <p>{content}</p>
      <style>{`
        .block {
          border-bottom: 1px solid;
        }
        span {
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default Item;