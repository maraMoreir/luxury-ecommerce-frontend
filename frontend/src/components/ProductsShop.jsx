import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { products } from "../data.js";
import "../styles/productsshop.css";
import ProductShop from "./ProductShop";
import ReactPaginate from "react-paginate";

const ProductsShop = () => {

    // para categoria e todos os produtos
    const [data, setData] = useState(products);

    // filtra por categoria
    const [category, setCategory] = useState([]);

    // por pagina
    const [pageNumber, setPageNumber] = useState(0);

    const productPerPage = 3;

    const pagesVisited = pageNumber * productPerPage;

    const displayProducts = data.slice(pagesVisited, pagesVisited + productPerPage).map((item) => (
        <ProductShop item={item} key={item._id} />
    ))

    const pageCount = Math.ceil(data.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    // filtro e todos os produtos
    const filterResult = (catItem) => {
        const result = products.filter((curDate) => {
            return curDate.category === catItem;
        });
        setData(result);
    }

    // mostra toda a categoria
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios.get('/api/category');
            setCategory(result.data);
        }
        fetchData();

    }, []);

    return (
        <div className="shop-container">
            <div className="shop-row">
                <div className="shop-col">
                    <h2>Categorias</h2>
                    <button className="shop-btn" onClick={() => setData(products)}>Todos<FontAwesomeIcon icon={faChevronRight} /></button>
                    {category.map((item) => (
                        <button className="shop-btn" onClick={() => filterResult(item.title)}>{item.title} <FontAwesomeIcon icon={faChevronRight} /></button>
                    ))}
                </div>
                <div className="shop-col">
                    <div className="shop-products">
                        {displayProducts}
                    </div>
                    <div className="shop-pagination">
                        <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductsShop;