#!/bin/sh

while read oldrev newrev refname
do
    branch=$(git rev-parse --symbolic --abbrev-ref $refname)

	if [ "staging/lung" == "$branch" ]; then
		echo "staging/lung. Sending jenkins build."
        curl -u jin:11da9bd347a5cd21b349ecab65fac5e31a https://jenkins.wintoncentre.uk/view/NHS-BT/job/nhsbt-lung-staging/build?token=jgfanw4jwiroegj09234t93gaoiwe

        command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/pre-push.\n"; exit 2; }
        git lfs pre-push "$@"

	elif [ "staging/kidney" == "$branch" ]; then
		echo "staging/kidney. Sending jenkins build."
        curl -u jin:11da9bd347a5cd21b349ecab65fac5e31a https://jenkins.wintoncentre.uk/view/NHS-BT/job/nhsbt-kidney-staging/build?token=jgfanw4jwiroegj09234t93gaoiwe

        command -v git-lfs >/dev/null 2>&1 || { echo >&2 "\nThis repository is configured for Git LFS but 'git-lfs' was not found on your path. If you no longer wish to use Git LFS, remove this hook by deleting .git/hooks/pre-push.\n"; exit 2; }
        git lfs pre-push "$@"


# 	elif [ "master" == "$branch" ]; then
# #	    ./build.sh
# 		echo "master. Please run manually in Jenkins to deploy."
# #	    curl -u jin:11da9bd347a5cd21b349ecab65fac5e31a https://jenkins.wintoncentre.uk/job/predict-breast-master/build?token=raiej345bgiojgahu4master
# 	fi

done

exit 0
