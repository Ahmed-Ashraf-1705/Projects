import 'package:flutter/material.dart';
import './homepage.pages.dart';

void main() => {runApp(MyApp())};

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "First test app",
      home: HomePage(),
    );
  }
}
