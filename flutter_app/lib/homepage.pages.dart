import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Register"),
        ),
        body: Column(
          children: <Widget>[
            Row(
              children: <Widget>[
                Container(
                  child: Text("Name"),
                  
                ),
                ],
              crossAxisAlignment: CrossAxisAlignment.center,
            ),
            
            div("Hello 1", Colors.red),
            div("Hello 1", Colors.blue),
          ],
        ));
  }

  Widget div(String title, Color color) {
    return Container(
      decoration: BoxDecoration(
        color: color,
      ),
      child: Text(title),
    );
  }
}
