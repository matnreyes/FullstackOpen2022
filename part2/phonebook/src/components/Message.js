const Message = ({ message }) => {
    if (message === null ) {
        return null
    }

    const messageStyle = {
        color: 'green',
        backgroundColor: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
       <div style={messageStyle}>
        {message}
       </div> 
    )
}

export default Message