#!/bin/sh

while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)

	if [ "staging/lung" == "$branch" ]; then
#	    ./build.sh
#        git add .
#        git commit -m "Auto commit build output"
		echo "staging/lung. Sending jenkins build."
        curl -u jin:11da9bd347a5cd21b349ecab65fac5e31a https://jenkins.wintoncentre.uk/job/predict-breast-develop/build?token=raiej345bgiojgahu4

        command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/pre-push.\n"; exit 2; }
        git lfs pre-push "$@"

	elif [ "staging/kidney" == "$branch" ]; then
#	    ./build.sh
#        git add .
#        git commit -m "Auto commit build output"
		echo "staging/kidney. Sending jenkins build."
        curl -u jin:11da9bd347a5cd21b349ecab65fac5e31a https://jenkins.wintoncentre.uk/job/predict-breast-staging/build?token=qweqweasd

        command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/pre-push.\n"; exit 2; }
        git lfs pre-push "$@"


# 	elif [ "master" == "$branch" ]; then
# #	    ./build.sh
# 		echo "master. Please run manually in Jenkins to deploy."
# #	    curl -u jin:11da9bd347a5cd21b349ecab65fac5e31a https://jenkins.wintoncentre.uk/job/predict-breast-master/build?token=raiej345bgiojgahu4master
# 	fi

done

exit 0
