import React from "react";
import logo from '../logo.svg';
import JobEntity from "../utils/entities/Job";

class Job extends React.Component<{}, {items: Array<JobEntity>, DetailsLoaded: boolean}> {
    constructor(props: any) {
        super(props);
   
        this.state = {
            items: [],
            DetailsLoaded: false
        };
    }

    componentDidMount() {
        fetch("https://headstarter-backend.herokuapp.com/get_jobs")
            .then((res) => res.json())
            .then((json: Array<any>) => {
                console.log(json, json.map((e) => e as JobEntity));
                this.setState({
                    items: json.map((e) => e as JobEntity),
                    DetailsLoaded: true
                });
            });
    }

    render() {
        const { DetailsLoaded, items } = this.state;
        if (!DetailsLoaded)  {
            return (
                <div className="card" style={{width: "18rem"}}>
                    <img src={logo}  className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">?</h5>
                        <p className="card-text">?</p>
                    </div>
                </div>
            )
        }

        const jobs = Array.from(items.map((e: JobEntity) => {
            return (
                <div className="d-inline-block card" style={{margin: "10px", width: "18rem"}}>
                    <img src={logo}  className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{ e.name }</h5>
                        <p className="card-text">{ e._id }</p>
                        <a href="!#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            )
        }));

        return <>
            {jobs}
        </>;
    }
}

export default Job;