import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import api from "../services/api";

//Parametro: convert?q=USD_PHP&compact=ultra&apiKey=db86f086a9bfc51fb5fc
class Conversor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: props.moedaA,
      moedaB: props.moedaB,
      moedaB_valor: 0,
      valorConvertido: 0,
    };

    this.converter = this.converter.bind(this);
  }

  async converter() {
    let de_param = this.state.moedaA + "_" + this.state.moedaB;
    const response = await api.get(
      `convert?q=${de_param}&compact=ultra&apiKey=db86f086a9bfc51fb5fc`
    );
    let cotacao = response.data[de_param];
    let resultado = cotacao * parseFloat(this.state.moedaB_valor);

    this.setState({
      valorConvertido: resultado.toFixed(2),
    });

    //Fechar o teclado automaticamente..
    Keyboard.dismiss();
  }

  render() {
    const { moedaA, moedaB } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          {moedaA} para {moedaB}
        </Text>

        <TextInput
          placeholder="Valor a ser convertido"
          style={styles.areaInput}
          onChangeText={(moedaB_valor) => this.setState({ moedaB_valor })}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botao} onPress={this.converter}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        <Text style={styles.valorConvertidoInput}>
          {this.state.valorConvertido === 0 ? "" : this.state.valorConvertido}
        </Text>
      </View>
    );
  }
}

export default Conversor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    width: 280,
    height: 45,
    backgroundColor: "#ccc",
    textAlign: "center",
    marginTop: 15,
    fontSize: 20,
    color: "#000",
    borderRadius: 5,
  },
  botao: {
    width: 150,
    height: 45,
    backgroundColor: "#ff0000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  botaoTexto: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  valorConvertidoInput: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },
});
x