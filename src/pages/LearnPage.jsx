import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, CheckCircle, Lock, Star, Code, User, Github, Mail } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';

const LearnPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍', color: 'from-blue-500 to-blue-600' },
    { id: 'javascript', name: 'JavaScript', icon: '📜', color: 'from-yellow-500 to-yellow-600' },
    { id: 'java', name: 'Java', icon: '☕', color: 'from-red-500 to-red-600' },
    { id: 'cpp', name: 'C++', icon: '⚡', color: 'from-green-500 to-green-600' },
    { id: 'sql', name: 'SQL', icon: '🗃️', color: 'from-purple-500 to-purple-600' },
    { id: 'c', name: 'C', icon: '🔧', color: 'from-indigo-500 to-indigo-600' }
  ];

  const learningContent = {
    python: {
      title: 'Python Complete Guide',
      description: 'Master Python from basics to advanced concepts',
      lessons: [
        {
          title: 'Python Basics',
          code: `# Python Programming Language - Complete Guide
# Created by: Anish Kumar
# GitHub: https://github.com/Anishhar03
# Email: anishharsh1971@gmail.com

# ========== PYTHON BASICS ==========

# 1. Variables and Data Types
name = "Anish Kumar"
age = 25
height = 5.8
is_programmer = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")
print(f"Is Programmer: {is_programmer}")

# 2. Data Types
# Numbers
integer_num = 42
float_num = 3.14
complex_num = 3 + 4j

# Strings
single_quote = 'Hello'
double_quote = "World"
multi_line = """This is a
multi-line string"""

# Boolean
is_true = True
is_false = False

# 3. Lists (Mutable)
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

print("Fruits:", fruits)
fruits.append("grape")
print("After append:", fruits)

# 4. Tuples (Immutable)
coordinates = (10, 20)
colors = ("red", "green", "blue")
print("Coordinates:", coordinates)

# 5. Dictionaries
person = {
    "name": "Anish",
    "age": 25,
    "city": "Delhi",
    "skills": ["Python", "JavaScript", "React"]
}
print("Person:", person)
print("Name:", person["name"])

# 6. Sets
unique_numbers = {1, 2, 3, 4, 5}
unique_numbers.add(6)
print("Unique numbers:", unique_numbers)`,
          explanation: 'Learn Python fundamentals including variables, data types, and basic operations.'
        },
        {
          title: 'Control Structures',
          code: `# ========== CONTROL STRUCTURES ==========

# 1. If-Else Statements
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# 2. For Loops
print("\\n=== For Loops ===")

# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop with range
for i in range(5):
    print(f"Number: {i}")

# Loop with enumerate
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# 3. While Loops
print("\\n=== While Loop ===")
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# 4. List Comprehensions
squares = [x**2 for x in range(10)]
print("Squares:", squares)

even_numbers = [x for x in range(20) if x % 2 == 0]
print("Even numbers:", even_numbers)

# 5. Dictionary Comprehensions
square_dict = {x: x**2 for x in range(5)}
print("Square dictionary:", square_dict)`,
          explanation: 'Master control flow with if-else statements, loops, and comprehensions.'
        },
        {
          title: 'Functions and Classes',
          code: `# ========== FUNCTIONS ==========

# 1. Basic Function
def greet(name):
    return f"Hello, {name}!"

print(greet("Anish"))

# 2. Function with Default Parameters
def introduce(name, age=25, city="Delhi"):
    return f"Hi, I'm {name}, {age} years old from {city}"

print(introduce("Anish"))
print(introduce("Anish", 30, "Mumbai"))

# 3. Function with *args and **kwargs
def flexible_function(*args, **kwargs):
    print("Args:", args)
    print("Kwargs:", kwargs)

flexible_function(1, 2, 3, name="Anish", age=25)

# 4. Lambda Functions
square = lambda x: x**2
print("Square of 5:", square(5))

# 5. Decorators
def my_decorator(func):
    def wrapper():
        print("Something before the function")
        func()
        print("Something after the function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()

# ========== CLASSES AND OOP ==========

# 1. Basic Class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old"
    
    def have_birthday(self):
        self.age += 1
        print(f"Happy birthday! Now I'm {self.age}")

# Create an object
person1 = Person("Anish", 25)
print(person1.introduce())
person1.have_birthday()

# 2. Inheritance
class Developer(Person):
    def __init__(self, name, age, programming_languages):
        super().__init__(name, age)
        self.programming_languages = programming_languages
    
    def code(self):
        return f"{self.name} is coding in {', '.join(self.programming_languages)}"
    
    def learn_language(self, language):
        self.programming_languages.append(language)
        print(f"Learned {language}!")

dev = Developer("Anish", 25, ["Python", "JavaScript"])
print(dev.introduce())
print(dev.code())
dev.learn_language("React")
print(dev.code())`,
          explanation: 'Learn functions, decorators, classes, and object-oriented programming concepts.'
        },
        {
          title: 'Advanced Python',
          code: `# ========== ADVANCED PYTHON ==========

# 1. File Handling
try:
    with open("example.txt", "w") as file:
        file.write("Hello, World!\\nThis is Anish Kumar")
    
    with open("example.txt", "r") as file:
        content = file.read()
        print("File content:", content)
except FileNotFoundError:
    print("File not found!")

# 2. Exception Handling
def divide_numbers(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        return "Cannot divide by zero!"
    except TypeError:
        return "Invalid input types!"
    finally:
        print("Division operation completed")

print(divide_numbers(10, 2))
print(divide_numbers(10, 0))

# 3. Generators
def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

fib_gen = fibonacci_generator(10)
print("Fibonacci sequence:", list(fib_gen))

# 4. Context Managers
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

# 5. Regular Expressions
import re

text = "Contact Anish at anishharsh1971@gmail.com"
email_pattern = r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b'
emails = re.findall(email_pattern, text)
print("Found emails:", emails)

# 6. Working with APIs (requests library simulation)
import json

# Simulated API response
api_response = {
    "name": "Anish Kumar",
    "github": "https://github.com/Anishhar03",
    "email": "anishharsh1971@gmail.com",
    "skills": ["Python", "JavaScript", "React", "Node.js"]
}

print("API Response:", json.dumps(api_response, indent=2))

# 7. Async Programming
import asyncio

async def fetch_data(name):
    print(f"Fetching data for {name}...")
    await asyncio.sleep(1)  # Simulate API call
    return f"Data for {name}"

async def main():
    tasks = [fetch_data("User1"), fetch_data("User2"), fetch_data("User3")]
    results = await asyncio.gather(*tasks)
    print("Results:", results)

# asyncio.run(main())  # Uncomment to run async code

print("\\n=== Python Mastery Complete! ===")
print("Created by: Anish Kumar")
print("GitHub: https://github.com/Anishhar03")
print("Email: anishharsh1971@gmail.com")`,
          explanation: 'Advanced topics including file handling, generators, async programming, and more.'
        }
      ]
    },
    javascript: {
      title: 'JavaScript Complete Guide',
      description: 'Master JavaScript from fundamentals to advanced concepts',
      lessons: [
        {
          title: 'JavaScript Fundamentals',
          code: `// JavaScript Programming Language - Complete Guide
// Created by: Anish Kumar
// GitHub: https://github.com/Anishhar03
// Email: anishharsh1971@gmail.com

// ========== JAVASCRIPT BASICS ==========

// 1. Variables and Data Types
let name = "Anish Kumar";
const age = 25;
var isActive = true; // Avoid using var, use let/const

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Active:", isActive);

// 2. Data Types
// Primitive Types
let number = 42;
let string = "Hello World";
let boolean = true;
let undefined_var;
let null_var = null;
let symbol = Symbol("id");
let bigint = 123n;

console.log("Types:", typeof number, typeof string, typeof boolean);

// 3. Arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

console.log("Fruits:", fruits);
fruits.push("grape");
console.log("After push:", fruits);

// Array methods
let doubled = numbers.map(num => num * 2);
let evens = numbers.filter(num => num % 2 === 0);
let sum = numbers.reduce((acc, num) => acc + num, 0);

console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);

// 4. Objects
let person = {
    name: "Anish Kumar",
    age: 25,
    city: "Delhi",
    skills: ["JavaScript", "React", "Node.js"],
    greet: function() {
        return \`Hello, I'm \${this.name}\`;
    }
};

console.log("Person:", person);
console.log("Greeting:", person.greet());

// Object destructuring
let { name: personName, age: personAge } = person;
console.log("Destructured:", personName, personAge);`,
          explanation: 'Learn JavaScript fundamentals including variables, data types, arrays, and objects.'
        },
        {
          title: 'Functions and Scope',
          code: `// ========== FUNCTIONS AND SCOPE ==========

// 1. Function Declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// 2. Function Expression
const greetExpression = function(name) {
    return \`Hi, \${name}!\`;
};

// 3. Arrow Functions
const greetArrow = (name) => \`Hey, \${name}!\`;
const square = x => x * x;
const add = (a, b) => a + b;

console.log(greet("Anish"));
console.log(greetExpression("Anish"));
console.log(greetArrow("Anish"));

// 4. Higher Order Functions
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("Double 5:", double(5));
console.log("Triple 4:", triple(4));

// 5. Closures
function counter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const myCounter = counter();
console.log("Count:", myCounter()); // 1
console.log("Count:", myCounter()); // 2

// 6. Callback Functions
function processData(data, callback) {
    console.log("Processing data...");
    setTimeout(() => {
        callback(data.toUpperCase());
    }, 1000);
}

processData("hello world", (result) => {
    console.log("Processed:", result);
});

// 7. IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("IIFE executed!");
})();

// 8. Rest and Spread Operators
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

console.log("Sum:", sum(1, 2, 3, 4, 5));

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log("Combined:", combined);`,
          explanation: 'Master functions, closures, callbacks, and advanced function concepts.'
        },
        {
          title: 'Modern JavaScript (ES6+)',
          code: `// ========== MODERN JAVASCRIPT (ES6+) ==========

// 1. Template Literals
const name = "Anish Kumar";
const age = 25;
const message = \`Hello, I'm \${name} and I'm \${age} years old.
I'm a developer from India.\`;
console.log(message);

// 2. Destructuring
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log("First:", first, "Second:", second, "Rest:", rest);

// Object destructuring
const developer = {
    name: "Anish Kumar",
    github: "https://github.com/Anishhar03",
    email: "anishharsh1971@gmail.com",
    skills: ["JavaScript", "React", "Python"]
};

const { name: devName, github, email, skills } = developer;
console.log("Developer:", devName, github);

// 3. Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        return \`Hi, I'm \${this.name}, \${this.age} years old\`;
    }
    
    static species() {
        return "Homo sapiens";
    }
}

class Developer extends Person {
    constructor(name, age, languages) {
        super(name, age);
        this.languages = languages;
    }
    
    code() {
        return \`\${this.name} codes in \${this.languages.join(", ")}\`;
    }
}

const dev = new Developer("Anish", 25, ["JavaScript", "Python", "React"]);
console.log(dev.introduce());
console.log(dev.code());

// 4. Promises
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Anish Kumar",
                    email: "anishharsh1971@gmail.com"
                });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

// Using Promises
fetchUserData(1)
    .then(user => console.log("User:", user))
    .catch(error => console.error("Error:", error));

// 5. Async/Await
async function getUserData(userId) {
    try {
        const user = await fetchUserData(userId);
        console.log("Async User:", user);
        return user;
    } catch (error) {
        console.error("Async Error:", error);
    }
}

getUserData(1);

// 6. Modules (ES6 Modules)
// Export example
export const PI = 3.14159;
export function calculateArea(radius) {
    return PI * radius * radius;
}

export default class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    divide(a, b) { return b !== 0 ? a / b : "Cannot divide by zero"; }
}

// 7. Map, Set, WeakMap, WeakSet
const myMap = new Map();
myMap.set("name", "Anish Kumar");
myMap.set("age", 25);
console.log("Map:", myMap.get("name"));

const mySet = new Set([1, 2, 3, 3, 4]);
console.log("Set:", mySet); // {1, 2, 3, 4}

console.log("\\n=== JavaScript Mastery Complete! ===");
console.log("Created by: Anish Kumar");
console.log("GitHub: https://github.com/Anishhar03");
console.log("Email: anishharsh1971@gmail.com");`,
          explanation: 'Learn modern JavaScript features including ES6+ syntax, classes, promises, and modules.'
        }
      ]
    },
    java: {
      title: 'Java Complete Guide',
      description: 'Master Java programming from basics to advanced concepts',
      lessons: [
        {
          title: 'Java Fundamentals',
          code: `// Java Programming Language - Complete Guide
// Created by: Anish Kumar
// GitHub: https://github.com/Anishhar03
// Email: anishharsh1971@gmail.com

// ========== JAVA BASICS ==========

public class JavaBasics {
    public static void main(String[] args) {
        System.out.println("=== Java Programming Guide ===");
        System.out.println("Created by: Anish Kumar");
        System.out.println("GitHub: https://github.com/Anishhar03");
        System.out.println("Email: anishharsh1971@gmail.com\\n");
        
        // 1. Variables and Data Types
        // Primitive Data Types
        byte byteVar = 127;
        short shortVar = 32767;
        int intVar = 2147483647;
        long longVar = 9223372036854775807L;
        float floatVar = 3.14f;
        double doubleVar = 3.14159265359;
        char charVar = 'A';
        boolean boolVar = true;
        
        System.out.println("Primitive Types:");
        System.out.println("byte: " + byteVar);
        System.out.println("int: " + intVar);
        System.out.println("double: " + doubleVar);
        System.out.println("char: " + charVar);
        System.out.println("boolean: " + boolVar);
        
        // 2. Strings
        String name = "Anish Kumar";
        String greeting = "Hello, " + name + "!";
        String formatted = String.format("I'm %s, %d years old", name, 25);
        
        System.out.println("\\nStrings:");
        System.out.println(greeting);
        System.out.println(formatted);
        System.out.println("Length: " + name.length());
        System.out.println("Uppercase: " + name.toUpperCase());
        
        // 3. Arrays
        int[] numbers = {1, 2, 3, 4, 5};
        String[] languages = {"Java", "Python", "JavaScript"};
        
        System.out.println("\\nArrays:");
        System.out.println("Numbers length: " + numbers.length);
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("numbers[" + i + "] = " + numbers[i]);
        }
        
        // Enhanced for loop
        System.out.println("Languages:");
        for (String lang : languages) {
            System.out.println("- " + lang);
        }
        
        // 4. Control Structures
        int age = 25;
        if (age >= 18) {
            System.out.println("\\nYou are an adult");
        } else {
            System.out.println("\\nYou are a minor");
        }
        
        // Switch statement
        String day = "Monday";
        switch (day) {
            case "Monday":
                System.out.println("Start of work week");
                break;
            case "Friday":
                System.out.println("TGIF!");
                break;
            default:
                System.out.println("Regular day");
        }
        
        // 5. Loops
        System.out.println("\\nFor loop:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        
        System.out.println("\\nWhile loop:");
        int count = 1;
        while (count <= 3) {
            System.out.println("While count: " + count);
            count++;
        }
    }
}`,
          explanation: 'Learn Java fundamentals including data types, arrays, control structures, and loops.'
        },
        {
          title: 'Object-Oriented Programming',
          code: `// ========== OBJECT-ORIENTED PROGRAMMING ==========

// 1. Basic Class
class Person {
    // Instance variables
    private String name;
    private int age;
    private String email;
    
    // Constructor
    public Person(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    
    // Getter methods
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
    
    // Setter methods
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setEmail(String email) { this.email = email; }
    
    // Instance method
    public void introduce() {
        System.out.println("Hi, I'm " + name + ", " + age + " years old");
        System.out.println("Email: " + email);
    }
    
    // Override toString method
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", email='" + email + "'}";
    }
}

// 2. Inheritance
class Developer extends Person {
    private String[] programmingLanguages;
    private String github;
    
    public Developer(String name, int age, String email, String[] languages, String github) {
        super(name, age, email); // Call parent constructor
        this.programmingLanguages = languages;
        this.github = github;
    }
    
    public String[] getProgrammingLanguages() { return programmingLanguages; }
    public String getGithub() { return github; }
    
    // Method overriding
    @Override
    public void introduce() {
        super.introduce(); // Call parent method
        System.out.println("I'm a developer!");
        System.out.println("GitHub: " + github);
        System.out.print("Languages: ");
        for (String lang : programmingLanguages) {
            System.out.print(lang + " ");
        }
        System.out.println();
    }
    
    public void code() {
        System.out.println(getName() + " is coding...");
    }
}

// 3. Abstract Class
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // Abstract method
    public abstract void makeSound();
    
    // Concrete method
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says Woof!");
    }
}

// 4. Interface
interface Drawable {
    void draw();
    default void print() {
        System.out.println("Printing...");
    }
}

interface Colorable {
    void setColor(String color);
}

class Circle implements Drawable, Colorable {
    private double radius;
    private String color;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius: " + radius);
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Circle color set to: " + color);
    }
}

// Main class to test OOP concepts
public class OOPExample {
    public static void main(String[] args) {
        System.out.println("=== Object-Oriented Programming ===");
        System.out.println("Created by: Anish Kumar\\n");
        
        // Create objects
        Person person = new Person("John Doe", 30, "john@example.com");
        person.introduce();
        
        System.out.println();
        
        String[] languages = {"Java", "Python", "JavaScript", "React"};
        Developer dev = new Developer("Anish Kumar", 25, "anishharsh1971@gmail.com", 
                                    languages, "https://github.com/Anishhar03");
        dev.introduce();
        dev.code();
        
        System.out.println();
        
        // Polymorphism
        Animal dog = new Dog("Buddy");
        dog.makeSound();
        dog.sleep();
        
        System.out.println();
        
        // Interface implementation
        Circle circle = new Circle(5.0);
        circle.draw();
        circle.setColor("Red");
        circle.print();
    }
}`,
          explanation: 'Master OOP concepts including classes, inheritance, polymorphism, and interfaces.'
        }
      ]
    },
    cpp: {
      title: 'C++ Complete Guide',
      description: 'Master C++ programming from basics to advanced concepts',
      lessons: [
        {
          title: 'C++ Fundamentals',
          code: `// C++ Programming Language - Complete Guide
// Created by: Anish Kumar
// GitHub: https://github.com/Anishhar03
// Email: anishharsh1971@gmail.com

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    cout << "=== C++ Programming Guide ===" << endl;
    cout << "Created by: Anish Kumar" << endl;
    cout << "GitHub: https://github.com/Anishhar03" << endl;
    cout << "Email: anishharsh1971@gmail.com\\n" << endl;
    
    // 1. Variables and Data Types
    int age = 25;
    double height = 5.8;
    char grade = 'A';
    bool isProgrammer = true;
    string name = "Anish Kumar";
    
    cout << "=== Basic Data Types ===" << endl;
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    cout << "Grade: " << grade << endl;
    cout << "Is Programmer: " << (isProgrammer ? "Yes" : "No") << endl;
    
    // 2. Arrays
    int numbers[5] = {1, 2, 3, 4, 5};
    cout << "\\n=== Arrays ===" << endl;
    cout << "Numbers: ";
    for (int i = 0; i < 5; i++) {
        cout << numbers[i] << " ";
    }
    cout << endl;
    
    // 3. Vectors (Dynamic Arrays)
    vector<string> languages = {"C++", "Python", "JavaScript", "Java"};
    cout << "\\n=== Vectors ===" << endl;
    cout << "Programming Languages: ";
    for (const string& lang : languages) {
        cout << lang << " ";
    }
    cout << endl;
    
    // Add element to vector
    languages.push_back("React");
    cout << "After adding React: ";
    for (const string& lang : languages) {
        cout << lang << " ";
    }
    cout << endl;
    
    // 4. Control Structures
    cout << "\\n=== Control Structures ===" << endl;
    
    // If-else
    if (age >= 18) {
        cout << "You are an adult" << endl;
    } else {
        cout << "You are a minor" << endl;
    }
    
    // Switch
    int choice = 1;
    switch (choice) {
        case 1:
            cout << "You chose option 1" << endl;
            break;
        case 2:
            cout << "You chose option 2" << endl;
            break;
        default:
            cout << "Invalid choice" << endl;
    }
    
    // 5. Loops
    cout << "\\n=== Loops ===" << endl;
    
    // For loop
    cout << "For loop: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    
    // While loop
    cout << "While loop: ";
    int count = 1;
    while (count <= 5) {
        cout << count << " ";
        count++;
    }
    cout << endl;
    
    // Range-based for loop (C++11)
    cout << "Range-based for loop: ";
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,
          explanation: 'Learn C++ fundamentals including data types, arrays, vectors, and control structures.'
        },
        {
          title: 'Functions and Pointers',
          code: `// ========== FUNCTIONS AND POINTERS ==========

#include <iostream>
#include <string>
#include <memory>

using namespace std;

// 1. Basic Functions
int add(int a, int b) {
    return a + b;
}

double multiply(double x, double y) {
    return x * y;
}

// Function with default parameters
void greet(string name = "World", string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

// Function overloading
int max(int a, int b) {
    return (a > b) ? a : b;
}

double max(double a, double b) {
    return (a > b) ? a : b;
}

// 2. Pass by Reference
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// 3. Pointers
void demonstratePointers() {
    cout << "\\n=== Pointers ===" << endl;
    
    int number = 42;
    int* ptr = &number;  // Pointer to number
    
    cout << "Value of number: " << number << endl;
    cout << "Address of number: " << &number << endl;
    cout << "Value of ptr: " << ptr << endl;
    cout << "Value pointed by ptr: " << *ptr << endl;
    
    // Modify value through pointer
    *ptr = 100;
    cout << "After modifying through pointer: " << number << endl;
    
    // Pointer arithmetic
    int arr[] = {1, 2, 3, 4, 5};
    int* arrPtr = arr;
    
    cout << "\\nArray elements using pointer arithmetic:" << endl;
    for (int i = 0; i < 5; i++) {
        cout << "arr[" << i << "] = " << *(arrPtr + i) << endl;
    }
}

// 4. Dynamic Memory Allocation
void demonstrateDynamicMemory() {
    cout << "\\n=== Dynamic Memory ===" << endl;
    
    // Allocate memory for single integer
    int* dynamicInt = new int(25);
    cout << "Dynamic integer: " << *dynamicInt << endl;
    
    // Allocate memory for array
    int size = 5;
    int* dynamicArray = new int[size];
    
    // Initialize array
    for (int i = 0; i < size; i++) {
        dynamicArray[i] = (i + 1) * 10;
    }
    
    cout << "Dynamic array: ";
    for (int i = 0; i < size; i++) {
        cout << dynamicArray[i] << " ";
    }
    cout << endl;
    
    // Free memory
    delete dynamicInt;
    delete[] dynamicArray;
    
    // Smart pointers (C++11)
    unique_ptr<int> smartPtr = make_unique<int>(42);
    cout << "Smart pointer value: " << *smartPtr << endl;
    // No need to manually delete - automatic cleanup
}

// 5. Function Pointers
int subtract(int a, int b) {
    return a - b;
}

void demonstrateFunctionPointers() {
    cout << "\\n=== Function Pointers ===" << endl;
    
    // Function pointer
    int (*operation)(int, int);
    
    operation = add;
    cout << "Addition: " << operation(10, 5) << endl;
    
    operation = subtract;
    cout << "Subtraction: " << operation(10, 5) << endl;
}

// 6. References
void demonstrateReferences() {
    cout << "\\n=== References ===" << endl;
    
    int original = 42;
    int& ref = original;  // Reference to original
    
    cout << "Original: " << original << endl;
    cout << "Reference: " << ref << endl;
    
    ref = 100;  // Modifying through reference
    cout << "After modifying reference:" << endl;
    cout << "Original: " << original << endl;
    cout << "Reference: " << ref << endl;
}

int main() {
    cout << "=== Functions and Pointers ===" << endl;
    cout << "Created by: Anish Kumar" << endl;
    
    // Test functions
    cout << "\\n=== Functions ===" << endl;
    cout << "Add(5, 3): " << add(5, 3) << endl;
    cout << "Multiply(2.5, 4.0): " << multiply(2.5, 4.0) << endl;
    
    greet();
    greet("Anish");
    greet("Anish", "Hi");
    
    cout << "Max(10, 20): " << max(10, 20) << endl;
    cout << "Max(3.14, 2.71): " << max(3.14, 2.71) << endl;
    
    // Test pass by reference
    int x = 10, y = 20;
    cout << "\\nBefore swap: x=" << x << ", y=" << y << endl;
    swap(x, y);
    cout << "After swap: x=" << x << ", y=" << y << endl;
    
    // Demonstrate other concepts
    demonstratePointers();
    demonstrateDynamicMemory();
    demonstrateFunctionPointers();
    demonstrateReferences();
    
    return 0;
}`,
          explanation: 'Master functions, pointers, dynamic memory allocation, and references in C++.'
        }
      ]
    },
    c: {
      title: 'C Programming Complete Guide',
      description: 'Master C programming from basics to advanced concepts',
      lessons: [
        {
          title: 'C Programming Fundamentals',
          code: `// C Programming Language - Complete Guide
// Created by: Anish Kumar
// GitHub: https://github.com/Anishhar03
// Email: anishharsh1971@gmail.com

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    printf("=== C Programming Guide ===\\n");
    printf("Created by: Anish Kumar\\n");
    printf("GitHub: https://github.com/Anishhar03\\n");
    printf("Email: anishharsh1971@gmail.com\\n\\n");
    
    // 1. Variables and Data Types
    int age = 25;
    float height = 5.8f;
    double pi = 3.14159265359;
    char grade = 'A';
    char name[50] = "Anish Kumar";
    
    printf("=== Basic Data Types ===\\n");
    printf("Name: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Pi: %.5f\\n", pi);
    printf("Grade: %c\\n", grade);
    
    // 2. Arrays
    int numbers[5] = {1, 2, 3, 4, 5};
    printf("\\n=== Arrays ===\\n");
    printf("Numbers: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");
    
    // Character array (string)
    char languages[][20] = {"C", "Python", "JavaScript", "Java"};
    printf("Programming Languages:\\n");
    for (int i = 0; i < 4; i++) {
        printf("- %s\\n", languages[i]);
    }
    
    // 3. Control Structures
    printf("\\n=== Control Structures ===\\n");
    
    // If-else
    if (age >= 18) {
        printf("You are an adult\\n");
    } else {
        printf("You are a minor\\n");
    }
    
    // Switch
    int choice = 1;
    switch (choice) {
        case 1:
            printf("You chose option 1\\n");
            break;
        case 2:
            printf("You chose option 2\\n");
            break;
        default:
            printf("Invalid choice\\n");
    }
    
    // 4. Loops
    printf("\\n=== Loops ===\\n");
    
    // For loop
    printf("For loop: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    
    // While loop
    printf("While loop: ");
    int count = 1;
    while (count <= 5) {
        printf("%d ", count);
        count++;
    }
    printf("\\n");
    
    // Do-while loop
    printf("Do-while loop: ");
    int num = 1;
    do {
        printf("%d ", num);
        num++;
    } while (num <= 5);
    printf("\\n");
    
    return 0;
}`,
          explanation: 'Learn C programming fundamentals including data types, arrays, and control structures.'
        },
        {
          title: 'Functions and Pointers in C',
          code: `// ========== FUNCTIONS AND POINTERS IN C ==========

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. Function Declarations
int add(int a, int b);
void greet(char name[]);
void swap(int *a, int *b);
int factorial(int n);
void printArray(int arr[], int size);

// 2. Basic Functions
int add(int a, int b) {
    return a + b;
}

void greet(char name[]) {
    printf("Hello, %s!\\n", name);
}

// 3. Recursive Function
int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// 4. Function with Array Parameter
void printArray(int arr[], int size) {
    printf("Array elements: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

// 5. Pointers and Functions
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void demonstratePointers() {
    printf("\\n=== Pointers ===\\n");
    
    int number = 42;
    int *ptr = &number;
    
    printf("Value of number: %d\\n", number);
    printf("Address of number: %p\\n", (void*)&number);
    printf("Value of ptr: %p\\n", (void*)ptr);
    printf("Value pointed by ptr: %d\\n", *ptr);
    
    // Modify value through pointer
    *ptr = 100;
    printf("After modifying through pointer: %d\\n", number);
    
    // Pointer arithmetic with arrays
    int arr[] = {10, 20, 30, 40, 50};
    int *arrPtr = arr;
    
    printf("\\nArray elements using pointer arithmetic:\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, *(arrPtr + i));
    }
}

// 6. Dynamic Memory Allocation
void demonstrateDynamicMemory() {
    printf("\\n=== Dynamic Memory Allocation ===\\n");
    
    // Allocate memory for integers
    int *dynamicArray;
    int size = 5;
    
    dynamicArray = (int*)malloc(size * sizeof(int));
    
    if (dynamicArray == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }
    
    // Initialize array
    for (int i = 0; i < size; i++) {
        dynamicArray[i] = (i + 1) * 10;
    }
    
    printf("Dynamic array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", dynamicArray[i]);
    }
    printf("\\n");
    
    // Reallocate memory
    size = 8;
    dynamicArray = (int*)realloc(dynamicArray, size * sizeof(int));
    
    // Initialize new elements
    for (int i = 5; i < size; i++) {
        dynamicArray[i] = (i + 1) * 10;
    }
    
    printf("After realloc: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", dynamicArray[i]);
    }
    printf("\\n");
    
    // Free memory
    free(dynamicArray);
    printf("Memory freed successfully\\n");
}

// 7. Structures
struct Person {
    char name[50];
    int age;
    char email[100];
};

void demonstrateStructures() {
    printf("\\n=== Structures ===\\n");
    
    struct Person person1;
    strcpy(person1.name, "Anish Kumar");
    person1.age = 25;
    strcpy(person1.email, "anishharsh1971@gmail.com");
    
    printf("Person Details:\\n");
    printf("Name: %s\\n", person1.name);
    printf("Age: %d\\n", person1.age);
    printf("Email: %s\\n", person1.email);
    
    // Array of structures
    struct Person developers[2];
    
    strcpy(developers[0].name, "Anish Kumar");
    developers[0].age = 25;
    strcpy(developers[0].email, "anishharsh1971@gmail.com");
    
    strcpy(developers[1].name, "John Doe");
    developers[1].age = 30;
    strcpy(developers[1].email, "john@example.com");
    
    printf("\\nDevelopers List:\\n");
    for (int i = 0; i < 2; i++) {
        printf("%d. %s (%d years) - %s\\n", 
               i+1, developers[i].name, developers[i].age, developers[i].email);
    }
}

// 8. File Operations
void demonstrateFileOperations() {
    printf("\\n=== File Operations ===\\n");
    
    FILE *file;
    char content[] = "Hello from C Programming!\\nCreated by: Anish Kumar\\n";
    
    // Write to file
    file = fopen("example.txt", "w");
    if (file != NULL) {
        fprintf(file, "%s", content);
        fclose(file);
        printf("File written successfully\\n");
    }
    
    // Read from file
    file = fopen("example.txt", "r");
    if (file != NULL) {
        char buffer[256];
        printf("File contents:\\n");
        while (fgets(buffer, sizeof(buffer), file) != NULL) {
            printf("%s", buffer);
        }
        fclose(file);
    }
}

int main() {
    printf("=== Advanced C Programming ===\\n");
    printf("Created by: Anish Kumar\\n\\n");
    
    // Test functions
    printf("=== Functions ===\\n");
    printf("Add(10, 5): %d\\n", add(10, 5));
    greet("Anish");
    
    printf("Factorial of 5: %d\\n", factorial(5));
    
    int numbers[] = {1, 2, 3, 4, 5};
    printArray(numbers, 5);
    
    // Test swap function
    int x = 10, y = 20;
    printf("\\nBefore swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\\n", x, y);
    
    // Demonstrate other concepts
    demonstratePointers();
    demonstrateDynamicMemory();
    demonstrateStructures();
    demonstrateFileOperations();
    
    printf("\\n=== C Programming Mastery Complete! ===\\n");
    printf("Created by: Anish Kumar\\n");
    printf("GitHub: https://github.com/Anishhar03\\n");
    printf("Email: anishharsh1971@gmail.com\\n");
    
    return 0;
}`,
          explanation: 'Master advanced C concepts including functions, pointers, structures, and file operations.'
        }
      ]
    },
    sql: {
      title: 'SQL Complete Guide',
      description: 'Master SQL from basic queries to advanced database operations',
      lessons: [
        {
          title: 'SQL Fundamentals',
          code: `-- SQL (Structured Query Language) - Complete Guide
-- Created by: Anish Kumar
-- GitHub: https://github.com/Anishhar03
-- Email: anishharsh1971@gmail.com

-- ========== SQL BASICS ==========

-- 1. Creating a Database
CREATE DATABASE learning_platform;
USE learning_platform;

-- 2. Creating Tables
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    instructor VARCHAR(100),
    duration_hours INT,
    price DECIMAL(10, 2),
    category VARCHAR(50)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    enrollment_date DATE,
    completion_status VARCHAR(20) DEFAULT 'In Progress',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- 3. Inserting Data
INSERT INTO users (name, email, age, city) VALUES
('Anish Kumar', 'anishharsh1971@gmail.com', 25, 'Delhi'),
('John Doe', 'john@example.com', 30, 'Mumbai'),
('Jane Smith', 'jane@example.com', 28, 'Bangalore'),
('Mike Johnson', 'mike@example.com', 32, 'Chennai'),
('Sarah Wilson', 'sarah@example.com', 26, 'Pune');

INSERT INTO courses (course_name, instructor, duration_hours, price, category) VALUES
('Python Programming', 'Anish Kumar', 40, 99.99, 'Programming'),
('JavaScript Fundamentals', 'Anish Kumar', 35, 89.99, 'Programming'),
('Data Science with Python', 'Dr. Smith', 60, 149.99, 'Data Science'),
('Web Development', 'John Developer', 50, 129.99, 'Web Development'),
('SQL Database Design', 'Anish Kumar', 30, 79.99, 'Database'),
('Machine Learning', 'AI Expert', 80, 199.99, 'AI/ML');

INSERT INTO enrollments (user_id, course_id, enrollment_date, completion_status) VALUES
(1, 1, '2024-01-15', 'Completed'),
(1, 2, '2024-02-01', 'In Progress'),
(2, 1, '2024-01-20', 'Completed'),
(2, 3, '2024-02-10', 'In Progress'),
(3, 4, '2024-01-25', 'Completed'),
(4, 5, '2024-02-05', 'In Progress'),
(5, 6, '2024-02-15', 'In Progress');

-- 4. Basic SELECT Queries
-- Select all users
SELECT * FROM users;

-- Select specific columns
SELECT name, email, city FROM users;

-- Select with WHERE clause
SELECT * FROM users WHERE age > 25;

-- Select with multiple conditions
SELECT * FROM users WHERE age > 25 AND city = 'Delhi';

-- Select with OR condition
SELECT * FROM users WHERE city = 'Delhi' OR city = 'Mumbai';

-- Select with LIKE (pattern matching)
SELECT * FROM users WHERE name LIKE 'A%';  -- Names starting with 'A'
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- Gmail addresses

-- Select with IN
SELECT * FROM users WHERE city IN ('Delhi', 'Mumbai', 'Bangalore');

-- Select with BETWEEN
SELECT * FROM courses WHERE price BETWEEN 80 AND 150;

-- 5. Sorting and Limiting
-- ORDER BY
SELECT * FROM users ORDER BY age DESC;
SELECT * FROM courses ORDER BY price ASC;

-- LIMIT
SELECT * FROM users LIMIT 3;
SELECT * FROM courses ORDER BY price DESC LIMIT 2;

-- 6. Aggregate Functions
-- COUNT
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_courses FROM courses;

-- AVG, MIN, MAX, SUM
SELECT AVG(age) as average_age FROM users;
SELECT MIN(price) as min_price, MAX(price) as max_price FROM courses;
SELECT SUM(duration_hours) as total_hours FROM courses;

-- 7. GROUP BY and HAVING
-- Group by city
SELECT city, COUNT(*) as user_count FROM users GROUP BY city;

-- Group by category with average price
SELECT category, AVG(price) as avg_price, COUNT(*) as course_count 
FROM courses GROUP BY category;

-- HAVING clause (filter groups)
SELECT category, COUNT(*) as course_count 
FROM courses 
GROUP BY category 
HAVING COUNT(*) > 1;

-- 8. Comments and Documentation
/*
This is a multi-line comment
Created by: Anish Kumar
Purpose: Demonstrate SQL fundamentals
*/

-- Single line comment
SELECT name, email FROM users; -- Get user names and emails`,
          explanation: 'Learn SQL fundamentals including database creation, tables, basic queries, and data manipulation.'
        },
        {
          title: 'Advanced SQL Operations',
          code: `-- ========== ADVANCED SQL OPERATIONS ==========
-- Created by: Anish Kumar
-- GitHub: https://github.com/Anishhar03
-- Email: anishharsh1971@gmail.com

-- 1. JOINS
-- INNER JOIN - Get users with their enrollments
SELECT u.name, u.email, c.course_name, e.enrollment_date, e.completion_status
FROM users u
INNER JOIN enrollments e ON u.id = e.user_id
INNER JOIN courses c ON e.course_id = c.course_id;

-- LEFT JOIN - Get all users, even those without enrollments
SELECT u.name, u.email, c.course_name, e.completion_status
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
LEFT JOIN courses c ON e.course_id = c.course_id;

-- RIGHT JOIN - Get all courses, even those without enrollments
SELECT u.name, c.course_name, c.instructor, e.completion_status
FROM users u
RIGHT JOIN enrollments e ON u.id = e.user_id
RIGHT JOIN courses c ON e.course_id = c.course_id;

-- 2. Subqueries
-- Find users who enrolled in Python Programming
SELECT name, email FROM users 
WHERE id IN (
    SELECT user_id FROM enrollments 
    WHERE course_id = (
        SELECT course_id FROM courses WHERE course_name = 'Python Programming'
    )
);

-- Find courses with above average price
SELECT course_name, price FROM courses
WHERE price > (SELECT AVG(price) FROM courses);

-- Find users with most enrollments
SELECT u.name, COUNT(e.enrollment_id) as enrollment_count
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
GROUP BY u.id, u.name
HAVING COUNT(e.enrollment_id) = (
    SELECT MAX(enrollment_count) FROM (
        SELECT COUNT(enrollment_id) as enrollment_count
        FROM enrollments
        GROUP BY user_id
    ) as counts
);

-- 3. Window Functions (Advanced)
-- Rank courses by price
SELECT course_name, price, category,
       RANK() OVER (ORDER BY price DESC) as price_rank,
       DENSE_RANK() OVER (PARTITION BY category ORDER BY price DESC) as category_rank
FROM courses;

-- Running total of course prices
SELECT course_name, price,
       SUM(price) OVER (ORDER BY course_id) as running_total
FROM courses;

-- 4. Common Table Expressions (CTEs)
WITH course_stats AS (
    SELECT category, 
           COUNT(*) as course_count,
           AVG(price) as avg_price,
           SUM(duration_hours) as total_hours
    FROM courses
    GROUP BY category
)
SELECT category, course_count, 
       ROUND(avg_price, 2) as avg_price,
       total_hours
FROM course_stats
WHERE course_count > 1;

-- 5. CASE Statements
SELECT name, age,
       CASE 
           WHEN age < 25 THEN 'Young'
           WHEN age BETWEEN 25 AND 30 THEN 'Adult'
           ELSE 'Senior'
       END as age_group
FROM users;

-- Course difficulty based on duration
SELECT course_name, duration_hours,
       CASE 
           WHEN duration_hours < 35 THEN 'Beginner'
           WHEN duration_hours BETWEEN 35 AND 60 THEN 'Intermediate'
           ELSE 'Advanced'
       END as difficulty_level
FROM courses;

-- 6. String Functions
SELECT name,
       UPPER(name) as uppercase_name,
       LOWER(email) as lowercase_email,
       LENGTH(name) as name_length,
       SUBSTRING(email, 1, POSITION('@' IN email) - 1) as username
FROM users;

-- 7. Date Functions
SELECT enrollment_date,
       YEAR(enrollment_date) as enrollment_year,
       MONTH(enrollment_date) as enrollment_month,
       DAYNAME(enrollment_date) as enrollment_day,
       DATEDIFF(CURDATE(), enrollment_date) as days_since_enrollment
FROM enrollments;

-- 8. Data Modification
-- UPDATE examples
UPDATE users SET city = 'New Delhi' WHERE city = 'Delhi';

UPDATE courses SET price = price * 0.9 WHERE category = 'Programming';

-- UPDATE with JOIN
UPDATE enrollments e
JOIN courses c ON e.course_id = c.course_id
SET e.completion_status = 'Completed'
WHERE c.duration_hours < 35 AND e.completion_status = 'In Progress';

-- 9. Views
CREATE VIEW user_course_summary AS
SELECT u.name, u.email, u.city,
       COUNT(e.enrollment_id) as total_enrollments,
       COUNT(CASE WHEN e.completion_status = 'Completed' THEN 1 END) as completed_courses,
       SUM(c.price) as total_spent
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
LEFT JOIN courses c ON e.course_id = c.course_id
GROUP BY u.id, u.name, u.email, u.city;

-- Use the view
SELECT * FROM user_course_summary WHERE total_enrollments > 1;

-- 10. Indexes for Performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_course_category ON courses(category);
CREATE INDEX idx_enrollment_date ON enrollments(enrollment_date);

-- 11. Stored Procedures
DELIMITER //
CREATE PROCEDURE GetUserCourses(IN user_id INT)
BEGIN
    SELECT u.name, c.course_name, c.instructor, e.completion_status
    FROM users u
    JOIN enrollments e ON u.id = e.user_id
    JOIN courses c ON e.course_id = c.course_id
    WHERE u.id = user_id;
END //
DELIMITER ;

-- Call the stored procedure
CALL GetUserCourses(1);

-- 12. Triggers
DELIMITER //
CREATE TRIGGER update_enrollment_timestamp
BEFORE UPDATE ON enrollments
FOR EACH ROW
BEGIN
    IF NEW.completion_status = 'Completed' AND OLD.completion_status != 'Completed' THEN
        SET NEW.completion_date = NOW();
    END IF;
END //
DELIMITER ;

-- Add completion_date column for the trigger
ALTER TABLE enrollments ADD COLUMN completion_date TIMESTAMP NULL;

-- 13. Complex Analytics Query
SELECT 
    c.category,
    COUNT(DISTINCT c.course_id) as total_courses,
    COUNT(DISTINCT e.user_id) as unique_students,
    COUNT(e.enrollment_id) as total_enrollments,
    ROUND(AVG(c.price), 2) as avg_course_price,
    SUM(c.duration_hours) as total_duration,
    ROUND(
        COUNT(CASE WHEN e.completion_status = 'Completed' THEN 1 END) * 100.0 / 
        COUNT(e.enrollment_id), 2
    ) as completion_rate_percent
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.category
ORDER BY total_enrollments DESC;

-- Final summary comment
/*
=== SQL Mastery Complete! ===
This comprehensive guide covers:
- Basic SQL operations (SELECT, INSERT, UPDATE, DELETE)
- Advanced queries with JOINs and subqueries
- Window functions and CTEs
- Views, stored procedures, and triggers
- Performance optimization with indexes
- Complex analytics and reporting

Created by: Anish Kumar
GitHub: https://github.com/Anishhar03
Email: anishharsh1971@gmail.com
*/`,
          explanation: 'Master advanced SQL concepts including joins, subqueries, window functions, and database optimization.'
        }
      ]
    }
  };

  const currentContent = learningContent[selectedLanguage];

  const openLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const closeLesson = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Learning Pathways</h1>
        <p className="text-gray-300 text-lg">Master programming languages with comprehensive guides</p>
      </motion.div>

      {/* Creator Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-effect p-6 rounded-xl"
      >
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-purple-400" />
            <span className="text-white font-medium">Created by: Anish Kumar</span>
          </div>
          <div className="flex items-center space-x-2">
            <Github className="w-5 h-5 text-purple-400" />
            <a href="https://github.com/Anishhar03" target="_blank" rel="noopener noreferrer" 
               className="text-purple-400 hover:text-purple-300 transition-colors">
              GitHub Profile
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-purple-400" />
            <a href="mailto:anishharsh1971@gmail.com" 
               className="text-purple-400 hover:text-purple-300 transition-colors">
              anishharsh1971@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-effect p-6 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Select Programming Language</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`p-4 rounded-lg transition-all ${
                selectedLanguage === lang.id
                  ? 'bg-gradient-to-r ' + lang.color + ' glow-effect'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="text-3xl mb-2">{lang.icon}</div>
              <div className="text-white font-medium">{lang.name}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Learning Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-effect p-6 rounded-xl"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{currentContent.title}</h2>
          <p className="text-gray-300 text-lg">{currentContent.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentContent.lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => openLesson(lesson)}
              className="learning-card p-6 rounded-xl cursor-pointer hover:bg-white/10 transition-all"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Code className="w-8 h-8 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{lesson.explanation}</p>
              <div className="flex items-center space-x-2 text-purple-400">
                <Play className="w-5 h-5" />
                <span className="font-medium">View Code</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLesson}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-effect p-6 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedLesson.title}</h3>
              <button
                onClick={closeLesson}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">{selectedLesson.explanation}</p>
            
            <div className="code-editor">
              <CodeEditor
                language={selectedLanguage}
                value={selectedLesson.code}
                onChange={() => {}} // Read-only
                height="500px"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LearnPage;