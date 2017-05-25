import React from 'react';


class FilterableProductTable extends React.Component{ 

    constructor(props){
        super(props);
        this.state = { products:[],
                       isChecked: false,
                       filterText: 'ball'
                     }
    }
    componentWillMount(){
       this.setState({products:[
           {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
            {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
            {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
            {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
            {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
            {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
       ]})
  }
   handleSearch(filterTextInput){
    this.setState({filterText:filterTextInput})
   }
   handleCheckBox(checked){
    this.setState({isChecked:checked})
   }

    render(){
        console.log(this.state.products);
        return(
           <div>
            <SearchBar onFilterTextInput={this.handleSearch.bind(this)}
              filterText={this.state.filterText} isChecked={this.state.isChecked} 
              onCheckboxInput={this.handleCheckBox.bind(this)}/>
            <Products items={this.state.products} filterText={this.state.filterText} isChecked={this.state.isChecked}/>
            </div>
        )
    }
}

class SearchBar extends React.Component{
    handleFilter(e){    
        this.props.onFilterTextInput(e.target.value)
    }
    handleCheck(e){
        this.props.onCheckboxInput(e.target.checked);
    }
    
    render(){
        
        return(
            <div>   
                <input type="text" name="search" onChange={this.handleFilter.bind(this)} 
                 value={this.props.filterText} />
                <input type="checkbox" name="isProduct" checked={this.props.isChecked}
                 onClick={this.handleCheck.bind(this)}/>
                <span>Only show Products in stock</span>
            </div>
          
        )
    }
 
}

class Products extends React.Component{
    render(){
      
        let lastCategory = null;
        let row = [];
         console.log(this.props.isChecked);
        this.props.items.forEach((item) =>{
              if (item.name.indexOf(this.props.filterText) === -1 || 
              (!item.stocked && this.props.isChecked)) {
                 return;
              }
             if(item.category !== lastCategory){
                                row.push(<ProductCategory catName={item.category} />)
                            }
                row.push(<ProductItem product={item} key={item.name} />)
                            
                            lastCategory = item.category; 
             })
        return(
            <table>
                <tbody>
                <th>Name</th>
                <th>Price</th>
                {row}
            </tbody>
          </table>
        )
    }
}

class ProductCategory extends React.Component{
    render(){
        return(
            <tr><td colSpan="2">{this.props.catName}</td></tr>
        )
    }
}
class ProductItem extends React.Component{
    render(){
        return(
            <tr key={this.props.product.name}><td>{this.props.product.name}</td><td>{this.props.product.price}</td></tr>
        )
    }
}

export default FilterableProductTable;
