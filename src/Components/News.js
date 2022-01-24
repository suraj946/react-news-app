import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import Infinitescroll from 'react-infinite-scroll-component';

export class News extends Component {
    capitalize(str){
        return str.charAt(0).toUpperCase()+str.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            page : 1,
            loading : false,
            totalResults : 0
        }
        document.title = `${this.capitalize(props.category)} | News-Monkey`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({articles : parsedData.articles, totalResults : parsedData.totalResults, loading : false});
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    fetchMore = async ()=>{
        this.setState({page : this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : this.state.articles.concat(parsedData.articles), totalResults : parsedData.totalResults});
    }

    // handleClickPrev = async()=>{
    //     let pNum = this.state.page - 1;
    //     this.updateNews(pNum);
    // }

    // handleClickNext = async()=>{
    //     let pNum = this.state.page + 1;
    //     this.updateNews(pNum);
    // }

    render() {
        return (
            <>
                <div>
                    <h1 className='text-center my-4'>News monkey - Top {this.capitalize(this.props.category)} Headlines</h1>
                    {this.state.loading && <div className="container my-4"><Spinner/></div>}
                    <Infinitescroll
                        dataLength = {this.state.articles.length}
                        next = {this.fetchMore}
                        hasMore = {this.state.articles.length !== this.state.totalResults}
                        loader = {<Spinner/>}
                    >
                        <div className="container">
                            <div className="row">
                                { this.state.articles.map((element)=>{
                                    return <div className="col-md-4" key={element.url}>
                                                <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                                        </div>
                                })}
                            </div>
                        </div>
                    </Infinitescroll>
                    
                    {/* <div className="container d-flex justify-content-between my-4">
                        <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handleClickPrev}>&laquo; Previous</button>
                        <button type="button" disabled={Math.ceil(this.state.totalResults/this.props.pageSize)===this.state.page} className="btn btn-primary" onClick={this.handleClickNext}>Next &raquo;</button>
                    </div> */}
                </div>
            </>
        )
    }
}

export default News
