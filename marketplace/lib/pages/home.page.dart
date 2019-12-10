import 'package:flutter/material.dart';
import 'package:marketplace/pages/login.page.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Hello world"),
      ),
      drawer: Drawer(
          child: ListView(
            children: <Widget>[
              DrawerHeader(
                child: Text("Header"),
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
              ),
              ListTile(
                title: Text("Login"),
                onTap: ()=>{
                  // action
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => LoginPage())
                    )
                },
                ),
                ListTile(
                  title: Text("Register"),
                  onTap: ()=>{
                    // action
                    print("hello register")
                  },
                )
            ],
          ),),
      body: Container(
        child: Center(
            child: Text(
          "Body container",
        )),
      ),
    );
  }
}
