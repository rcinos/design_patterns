# Assumptions

1. Coordinates for instances' creation are grouped in one file for one shape. It means that all coordinates for Quadrilateral for example are located in validQuadrilateral.txt
2. All input coordinates will use conventions of the order of input data. It means, that all input coordinates should apply the following order: x: 2.0, y: 2.0, z: 2.0
3. A pattern of input data will look like:
   - Quadrilateral:
     - Left Top corner: **2.0 3.0**
     - Right Top corner: **5.0 3.0**
     - Right Bottom corner: **5.0 5.0**
     - Left Bottom corner: **2.0 5.0**
     - The whole **_line_** must look like: **2.0 3.0 5.0 3.0 5.0 5.0 2.0 5.0 **
       - Coordinates can be integers, so a line can look like: **2 3 5.0 3.0 2.0 5 5 5.0**
   - Sphere:
     - Center: **2.0 3.0 3.0**
     - Radius: **5.0**
     - Similarly to Quadrilateral input data can contain integers and floats
     - The whole line can look like: **2 3 3.0 5**
   - The order **DOES** matter, cause there are multiple variations of implementation of the same set of coordinates
   - Otherwise, an error will occur
4. As we are dealing with point float numbers, we can not get a precise value, so that is why we need to introduce an error which will be 10**12 / 2