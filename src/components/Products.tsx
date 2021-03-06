import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Grid, CardMedia, Card, CardHeader, TextField, CardContent, Button, CardActions, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUpdateC, useC } from '../context/Context'

const useStyles = makeStyles(theme => ({
    Input: {
      height: '10%',
      width: '40%',
      marginTop: '3%'
    },
    Container: {
        flexDirection: 'column',
    },
    Button: {
        marginTop: '5%',
        width: '40%',
        backgroundColor: '#4287f5',
        color: 'white'
    },
    Main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Form: {
        width: '70%',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: 'black'        
    },
    Item: {
        flexDirection: 'row'
    },
    H1: {
        marginTop: '5%'
    },
    Select: {
        marginTop: '5%',
    },
    Group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%'
    }
  }))

function Products() {

    const classes = useStyles();
    const [productForm, setProductForm] = useState({id: '', title: '', price: '', picture: '', type: ''})
    const [products, setProducts] = useState([{title: '', price: '', picture: '', type: ''}])
    const [isVisible, setIsVisible] = useState(false)
    const {context}:any = useC()
    const {updateData}:any = useUpdateC();

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/products?page=1&limit=50',
        })
            .then(resp => {
                setProducts(resp.data)
            })
    }, [])


    const changeProductModal = (product:any) => {
        setProductForm({...product, id: 0})
        setIsVisible(true)
    }

    const changeProduct = (form:any) => {
        axios({
            method: 'put',
            url: 'http://localhost:8000/products',
            data: form
        })
            .then(resp => {
                setProducts(resp.data)
                setIsVisible(false)
            })
    }

    const deleteProduct = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:8000/products',
        })
            .then(resp => {
                setProducts(resp.data)
            })
    }

    const addProduct = (form:any) => {
        axios({
            method: 'post',
            url: 'http://192.168.31.181:8000/products',
            data: form
        })
            .then(resp => {
                setProducts(resp.data)
                setIsVisible(false)
            })
    }

    return (
        <div>
            <Button onClick={() => setIsVisible(true)} >Add product</Button>
            <Grid
            container
            className={classes.Main}
            >
                {products[0].title
                ? products.map((product, index) => (
                    <Grid item key={index}>
                        <Card>
                            <CardHeader title={product.title} />
                            <CardMedia image={product.picture} />
                            <CardContent>
                                {product.type}{product.price}
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => changeProductModal(product)} size="small" color="primary" >
                                    Change product
                                </Button>
                                <Button onClick={() => changeProductModal(product)} size="small" color="primary" >
                                    Delete Product
                                </Button>
                            </CardActions>
                        </Card>

                    </Grid>
                ))
                : null
                }

            </Grid>

            <Modal
            open={isVisible}
            onClose={() => setIsVisible(!isVisible)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <form className={classes.Form}>
                    <Grid
                    container
                    className={classes.Container}>
                        <Grid
                        item
                        className={classes.Item}>
                            <TextField
                            className={classes.Input}
                            required
                            label='Product Name'
                            variant='outlined'
                            onChange={event => setProductForm({...productForm, title: event.target.value})}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            className={classes.Input}
                            required
                            label='Price'
                            variant='outlined'
                            onChange={event => setProductForm({...productForm, price: event.target.value})}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            className={classes.Input}
                            required
                            label='Type'
                            variant='outlined'
                            onChange={event => setProductForm({...productForm, type: event.target.value})}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            className={classes.Input}
                            required
                            label='Picture'
                            variant='outlined'
                            onChange={event => setProductForm({...productForm, picture: event.target.value})}
                            />
                        </Grid>
                    </Grid>
                    {productForm.id
                    ? <Button onClick={() => changeProduct(productForm)} className={classes.Button} >Submit</Button>
                    : <Button onClick={() => addProduct(productForm)} className={classes.Button} >Submit</Button>
                    }
                    
                </form>
            </Modal>
            
        </div>
    );
}

export default Products;