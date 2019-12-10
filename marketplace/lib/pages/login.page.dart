import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget{

  @override
  State<StatefulWidget> createState() => new _LoginPageState();

}
class _LoginPageState extends State<LoginPage>{

  // required to run our validators
  final formKey = new GlobalKey<FormState>();
  
  // variables
  String _name;
  String _pw;
  // validates and submits data to firebase
  void login(){
    final form = formKey.currentState;

    if (form.validate()) {
      form.save();

      print("form is valid!");
      print('name is ${_name} and password ${_pw}');
    } else {
      print("something wrong!");
    }
  }
  @override 
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: Container(
        padding: EdgeInsets.all(18.0),
        child: Form(
          key: formKey,
          child: Column(
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Email',
                ),
                validator: (val)=> val.isEmpty ? 'Email is required':null ,
                onSaved: (data)=> _name = data,
              ),
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Password',
                ),
                obscureText: true,
                validator: (val)=> val.isEmpty ? 'Password is required':null ,
                onSaved: (data)=> _pw = data,
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  RaisedButton(
                    child: Text("Login"),
                    onPressed: this.login,
                  ),
              ],
              )
            ],
          ),
        ),
      ),
    );
  }
}