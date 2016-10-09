// React is defined globally

module.exports = React.createClass({
    render: function () {
        return (
            <h1>{this.props.msg}Your VIN is: </h1>
        );
    }
});

// <h1>{this.props.msg}. Your vin is: {gm.info.getVIN()}</h1>