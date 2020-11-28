echo "Building lib"
mkdir build
cd build
cmake ../mgba -DLIBMGBA_ONLY:bool=TRUE -DBUILD_PYTHON:bool=TRUE
make
cd ..
cp -r build/python/lib.linux-x86_64-3.8/mgba server/mgba
echo "Done"

