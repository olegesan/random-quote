const APIlink = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
const randomNum=(length)=>(Math.floor(Math.random()*length))
const colorSchemes=[['706698','F3F5F4'],['201F28','E4E6E1'],['DF7B86','FAFAF9'], ['1FABC2','F6F8F7']]
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      quote:'',
      author:'',
      numOfQt:'',
      quotes:[],
    }
    this.getQuotes = this.getQuotes.bind(this)
    this.getNewQuote = this.getNewQuote.bind(this)
  }
  async getQuotes(){
    let quotes = await fetch(APIlink)
    .then(data=>data.json())    
    .then(data=>{ this.setState(
     {quotes:data.quotes,numOfQt:data.quotes.length}
    )
    return data.quotes
    })
    let rndQtID=randomNum(quotes.length)
    let quote=`"${quotes[rndQtID].quote}"`
    let author=quotes[rndQtID].author
    this.setState({quote,author})
  }
  getNewQuote(){
    const newQtID = randomNum(this.state.numOfQt)
    let quote = `"${this.state.quotes[newQtID].quote}"`
    let author = this.state.quotes[newQtID].author
    this.setState({quote,author})
  }
  componentWillMount(){
    this.getQuotes();
  }
  render(){
    const style = ()=>{
    let randomPallet = colorSchemes[Math.floor(Math.random()*colorSchemes.length)]
    return {backgroundColor:`#${randomPallet[0]}`,
            color:`#${randomPallet[1]}`
            }
    }
    const {color,backgroundColor}=style()
    const inBoxStyle = {color,backgroundColor}
    
    return(
      <div className='container' style={{width:'100vw', height:'100vh',color, backgroundColor}}>
        <div id='quote-box'className='App' style={{backgroundColor:color, color:backgroundColor}}>

           <h1 id='text'>
            {`${this.state.quote}`}
          </h1>
          <h3 id='author'>by {this.state.author}</h3>
      
         
          <div className='actions'>
            <button id='new-quote' style={inBoxStyle} onClick={this.getNewQuote}>New Quote</button>
            <br/>
            <a style={inBoxStyle} href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(this.state.quote)} ${encodeURIComponent(this.state.author)}`} id='tweet-quote'>tweet</a>
          </div>
        </div>
      </div>
      )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



