
import 'package:flutter/material.dart';
import 'pages/home.page.dart';

void main() {
  return runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "First App",
      home: HomePage(),
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),

          
    );
  }

}