import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import image from "../../images/background.jpg";
import Box from "@material-ui/core/Box"
import AddIcon from "@material-ui/icons/Add";
import PortfolioModal from "./PortfolioModal"

const useStyles = makeStyles((theme) => ({
    box: {
        height: 80,
        display: "inline-flex",
        padding:1,
    },
    centerBox:{
        display: "inline-flex",
        justifyContent:'flex-end',
        alignItems:"flex-end",
        paddingTop:100,
        paddingBottom: 0,
        paddingRight: 20
    },
}));


const Portfolio = () => {
    const classes = useStyles();
    let [coinData, setCoinData] = useState([])
    const [openModal, setOpenModal] = useState(false);
    /*useEffect( () => {
        axios.get('https://api.coingecko.com/api/v3/coins/')
            .then( response => {
                setCoinData(response.data);
                console.log("data is ", response.data);
            })
            .catch( error => {
                console.log(error);
            })
    },[]);*/
    return(

        <SafeAreaView style={{flex: 1, backgroundColor:"white"}}>
            <Box component={"span"} className={`${classes.centerBox} `}>
                <Button variant={'contained'} style={{
                    textAlign: "center",
                    backgroundColor: "blue",
                    color:"#FFFFF0",
                    padding: "5px 5px",
                    borderRadius: "8px",
                    outline: "1px",
                    width: "10%",
                }} className={'btn-modal'} startIcon={<AddIcon />} onClick={() => {
                    setOpenModal(true)
                }}>
                    Add transaction
                </Button>
            </Box>
            <ScrollView style={{flex:1}}>
                <View style={{paddingTop:0,paddingHorizontal: 20, marginBottom:40}}>
                    <Text style={{color: "#5d616f", fontSize:14, fontWeight: "500"}}>
                       Your Current Portfolio Balance
                    </Text>
                    <Text
                        style={{
                            color: "#090C0D",
                            fontSize:29,
                            fontWeight:"bold",
                        paddingTop:5
                        }}
                    >
                        R0.00
                    </Text>

                    {/*{coinData.map((coin) =>(*/}

                      <View >

                          <View style={{paddingTop:25, flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
                              <p style={{alignItems:"center"}}>You currently have no currency in your Portfolio. Click Add transaction to add one.</p>
                          </View>

                          {/*<View style={{paddingTop:25, flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
                            <View>
                                <Image
                                    source={{uri:coin.image.large}}
                                style={{width:50, height:50, borderRadius: 25,borderWidth:0.5, borderColor: "#ddd"}}/>
                            </View>

                              <View style={{flex: 1,paddingLeft:15}}>
                                  <Text style={{fontSize:17,fontWeight:400}}>
                                      {coin.name}
                                  </Text>
                              </View>

                              <View style={{flex:1.5,paddingLeft:10}}>
                                  <Text style={{fontSize:16,fontWeight:"bold" }}>
                                      Price
                                  </Text>
                                  <Text style={{fontSize:14,fontWeight:300, color:"#5d616d"}}>
                                      R{coin.market_data.current_price.zar}
                                  </Text>
                              </View>

                              <View style={{flex:1.5,paddingLeft:10}}>
                                  <Text style={{fontSize:16,fontWeight:"bold"}}>
                                      24H
                                  </Text>
                                  <Text style={{fontSize:14,fontWeight:300, color:"#5d616d"}}>

                                      {coin.market_data.price_change_percentage_24h < 0 ? (
                                          <p className='coin-percent red'>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                                      ) : (
                                          <p className='coin-percent green'>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                                      )}

                                  </Text>
                              </View>

                              <View style={{flex:1.5,paddingLeft:10}}>
                                  <Text style={{fontSize:16,fontWeight:"bold"}}>
                                      Gain/Loss
                                  </Text>
                                  <Text style={{fontSize:14,fontWeight:300, color:"#5d616d"}}>

                                     R0.00

                                  </Text>
                              </View>

                              <View style={{paddingLeft:15}}>
                                  <Text style={{fontSize:16,fontWeight:300}}>
                                      R0.00
                                  </Text>
                                  <Text style={{fontSize:14,fontWeight:300, color:"#5d616d"}}>
                                      0 {coin.symbol}
                                  </Text>
                              </View>



                          </View>*/}

                      </View>
                    {/*))}*/}

                </View>
            </ScrollView>
            {openModal && <PortfolioModal closeModal={setOpenModal} />}
        </SafeAreaView>
    )
}
export default Portfolio;