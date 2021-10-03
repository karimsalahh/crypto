import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Loader from "./Loader";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setCryptos(
      cryptosList?.data?.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    );
  }, [cryptosList, searchTerm]);
  if (isFetching && !simplified) return <Loader />;
  return (
    <>
      {!simplified ? (
        <div className="search-crypto">
          <Input
            placeholder="Search cryptocurrencies..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      ) : (
        <></>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin) => (
          <Col xs={24} sm={12} lg={8} className="crypto-card" key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card
                hoverable
                title={`${coin.rank}. ${coin.name}`}
                extra={
                  <img className="crypto-image" src={coin.iconUrl} alt="" />
                }
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
