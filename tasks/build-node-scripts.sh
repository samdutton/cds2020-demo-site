#!/bin/sh
OUTDIR=$PWD/dist
BABEL=$PWD/node_modules/.bin/babel

mkdir -p $OUTDIR/server &&
mkdir -p $OUTDIR/common &&
mkdir -p $OUTDIR/shared/js &&
mkdir -p $OUTDIR/data &&
mkdir -p $OUTDIR/templates &&
mkdir -p $OUTDIR/services &&

cp -R src/data/* $OUTDIR/data &&
cp -R src/templates/* $OUTDIR/templates &&

if [ "$NODE_ENV" = "production" ]
then
OPTIONS="--minified --compact=true"
else
OPTIONS="-s"
fi

$BABEL $OPTIONS --out-dir=$OUTDIR/server src/server &&
$BABEL $OPTIONS --out-dir=$OUTDIR/common src/common &&
#$BABEL $OPTIONS --out-dir=$OUTDIR/shared/js src/shared/js &&
$BABEL $OPTIONS --out-dir=$OUTDIR/services src/services
