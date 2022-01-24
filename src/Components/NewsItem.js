import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, desc, imageUrl, newsUrl, author, time, source} = this.props;
        return (
            <div>
                <div className="card">
                    <div style={{position:"absolute", right:0}}>
                        <span className="badge rounded-pill bg-danger" style={{left:"90%"}} >{source}</span>
                    </div>
                    <img src={imageUrl?imageUrl:"https://gumlet.assettype.com/bloombergquint%2F2022-01%2Fe3344c44-9839-40ab-bdb7-fff44f801673%2F366809522.jpg?rect=0%2C568%2C3998%2C2099&w=1200&auto=format%2Ccompress&ogImage=true"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                        <p className="card-text">{`By ${author?author:"Unknown"} on ${new Date(time).toGMTString()}`}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Details</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
