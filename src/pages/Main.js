import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Alert, Linking } from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome5';

import LinearGradient from "react-native-linear-gradient";
import Spinner from 'react-native-loading-spinner-overlay';

import Video from "react-native-video";
import { ThemeColors } from "react-navigation";

class Main extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isPlaying: false,
            playbackInstance: null,
            volume: 1,
            isBuffering: true,
            spinner: false,
            link: "",
            error: false
        }

        this.onBuffer = this.onBuffer.bind(this);
        this.videoError = this.videoError.bind(this);
        console.disableYellowBox = true
    }

	async componentDidMount() {
        try{
            const responseFetch = await fetch("http://radiosucessoweb.caster.fm/");
            const codigoFontePag = await responseFetch.text();
        
            const indexLink = codigoFontePag.indexOf("http://shaincast.caster.fm:32582/listen.mp3?");
            const linkFinal = codigoFontePag.substring(indexLink, indexLink+81);
            
            if(indexLink === -1){
                await this.setState({error: true});

                Alert.alert("Estamos Offline", 
                    "Um erro ao se conectar ao servidor ocorreu, verifique sua conexão com a internet, se estiver normal, estamos offline.",
                    [{text: "OK", onPress: () => console.log("OK - Erro servidor")}], { cancelable: false});
            }
            //const linkFinal = "http://centovas.hdsolucoes.com:8296/stream";
            //DESCUBRIR UM JEITO DE LANCAR ERRO SE LINK NAO EXISTE

            this.setState({link: linkFinal})
        }
        catch(e){
            await this.setState({error: true});
            console.log(e);

            Alert.alert("Erro Isnesperado", 
                "Um erro inesperado ocorreu: " + e,
                [{text: "OK", onPress: () => console.log("OK - Erro servidor")}], { cancelable: false});

        }
    }

	handlePlayPause = async () => {
        console.log("A: " + this.state.isBuffering)
        try{
            if(this.state.error == false){
                this.setState({
                    isPlaying: !this.state.isPlaying
                });
            }
            else{
                Alert.alert("Estamos Offline", 
                "Um erro ao se conectar ao servidor ocorreu, verifique sua conexão com a internet, se estiver normal, estamos offline.",
                [{text: "OK", onPress: () => console.log("OK - Erro servidor")}], { cancelable: false});
            }
        }
        catch(e){
            await this.setState({error: true});
            Alert.alert("Estamos Offline", 
                "Um erro ao se conectar ao servidor ocorreu, verifique sua conexão com a internet, se estiver normal, estamos offline.",
                [{text: "OK", onPress: () => console.log("OK - Erro servidor")}], { cancelable: false});

            console.log(e);
        }
    }
    
    async onBuffer({ isBuffering }){
        await this.setState({isBuffering});

        await this.setState({spinner: isBuffering});
        console.log(this.state.isBuffering);
    }

    async videoError(Error){
        await this.setState({spinner: false});
        console.log(Error);
        await this.setState({error: true});
        Alert.alert("Estamos Offline", 
            "Um erro ao se conectar ao servidor ocorreu, verifique sua conexão com a internet, se estiver normal, estamos offline.",
            [{text: "OK", onPress: () => console.log("OK - Erro servidor")}], { cancelable: false});

    }

    async onLoad(){
        await this.setState({spinner: false});
    }

    async onLoadStart(){
        await this.setState({spinner: true});
    }


    render(){
        return (
            <ImageBackground source={require("./../../assets/background.png")} style={styles.backgroundStyle}>
                    
            <View style={styles.coverContainer}>
                <Image source={require("./../../assets/coverArtv2.png")} style={styles.cover}></Image>
            </View>

            <Spinner
                visible={this.state.spinner}
                textContent={'Carregando...'}
                size="large"
                overlayColor="rgba(0, 0, 0, 0.85)"
                textStyle={styles.spinnerTextStyle}
            />

            { !!this.state.link && <Video source={{uri: this.state.link}}
                ref={(ref)=> {
                    this.player = ref
                }}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                onLoad={this.OnLoad}
                rate={1}
                volume={1}
                paused={!this.state.isPlaying}
                playInBackground={true}
                playWhenInactive={true}

            /> }
                

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 50, marginBottom: 45 }}>
                    <TouchableOpacity>
                        <Icon name="backward" size={32} color="#fff"></Icon>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.playButtonContainer} onPress={this.handlePlayPause}>
                    <LinearGradient
                        colors={["#11308f", "#a11137"]}
                        style={styles.playButtonContainer}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                    >
                        <Icon
                            name={(this.state.isPlaying)?"pause":"play"}
                            size={32}
                            color="#fff"
                            style={(this.state.isPlaying)?{ marginLeft: 0 }:{ marginLeft: 8 }}
                        ></Icon>
                    </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon name="forward" size={32} color="#fff"></Icon>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL(
                    "mailto:radiosucessofraiburgo@gmail.com?subject=Mensagem do Ouvinte&body=Escreva sua mensagem aqui")} 
                    style={styles.buttonShadow}>
                    <LinearGradient
                        colors={["#11308f", "#a11137"]}
                        style={styles.button}
                        start={{x:0, y:0}}
                        end={{x:1, y:1}}
                    >
                        <Text style={styles.textButton}>Fale Conosco</Text>
                    </LinearGradient>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 50}}>
                    <TouchableOpacity style={{marginRight: 30}} onPress={() => Linking.openURL("https://www.facebook.com/webradiosucesso/?ref=br_rs")}>
                        <Icon name="facebook" size={32} color="#fff"></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginRight: 30}} onPress={() => Linking.openURL("https://instagram.com/radiowebsucesso?igshid=vuh7qt4aksa6")}>
                        <Icon name="instagram" size={32} color="#fff"></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SiteWebView")}>
                        <Icon name="globe" size={32} color="#fff"></Icon>
                    </TouchableOpacity>
            </View>

            

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    textLight: {
        color: "#B6B7BF"
    },
    text: {
        color: "#8E97A6"
    },
    textDark: {
        color: "#3D425C"
    },

    spinnerTextStyle: {
        color: '#FFF'
      },
    
    track: {
        height: 2,
        borderRadius: 1,
        backgroundColor: "#FFF"
    },
    thumb: {
        width: 8,
        height: 8,
        backgroundColor: "#3D425C"
    },
    timeStamp: {
        fontSize: 11,
        fontWeight: "500"
    },
    playButtonContainer: {
        backgroundColor: "#FFF",
        borderColor: "#fff",
        borderWidth: 4,
        width: 120,
        height: 120,
        borderRadius: 64,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 32,
        shadowColor: "#5D3F6A",
        shadowRadius: 30,
        shadowOpacity: 0.5
    },



    button:{
        width: 250,
        height: 50,
        borderRadius: 20,
        justifyContent: "center",
        marginBottom: 20
    },
    
    textButton:{
        textAlign:"center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
 
    viewButtons:{
        marginTop: 50
    },
 
    coverContainer: {
     marginTop: 16,
     width: 350,
     height: 240,
     },
 
     cover: {
         width: 350,
         height: 240,
     },
 
     backgroundStyle:{
         flex: 1,
         alignItems: "center"
     },
 
     buttonShadow:{
         elevation: 10,
         width: 250,
         height: 50,
         borderRadius: 20,
         borderWidth: 0,
     },
 
     buttonShadow2:{
         marginBottom: 20,
         elevation: 10,
         width: 250,
         height: 50,
         borderRadius: 20,
         borderWidth: 0,
     }
});

export default Main;