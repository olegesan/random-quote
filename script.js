const APIlink = 'https://gist.githubusercontent.com/b1nary/ea8fff806095bcedacce/raw/6e6de20d7514b93dd69b149289264997b49459dd/enterpreneur-quotes.json'
const randomNum=(length)=>(Math.floor(Math.random()*length))
console.log(APIlink)
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
     {quotes:data,numOfQt:data.length}
    )
    return data
    })
    let rndQtID=randomNum(quotes.length)
    let quote=quotes[rndQtID].text
    let author=quotes[rndQtID].from
    this.setState({quote,author})
    console.log(this.state)
  }
  getNewQuote(){
    const newQtID = randomNum(this.state.numOfQt)
    let quote = this.state.quotes[newQtID].text
    let author = this.state.quotes[newQtID].from
    this.setState({quote,author})
    console.log('getNewQuote')
  }
  componentWillMount(){
    
    this.getQuotes();
  }
    render(){
      return(
        <div id='quote-box'className='App'>
          <h1 id='text'>
            {this.state.quote}
           </h1>
          <h3 id='author'>by {this.state.author}</h3>
          <button id='new-quote'onClick={this.getNewQuote}>New Quote</button>
          <br/>
          <a href="https://twitter.com/intent/tweet" id='tweet-quote'>[tweet]</a>
         </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));

