# SnapShare Scaling Plan

## Assumptions

SnapShare is a photo-sharing application where users upload photos and view photos from people they follow.

Given:

- Registered users: 10,000,000
- Daily active users: 10% of registered users
- Each active user uploads 1 photo per day
- Each active user views 50 feed pages per day
- Average photo size: 2 MB
- Thumbnail size: 50 KB

Daily active users:

10,000,000 × 10% = 1,000,000 daily active users


## Traffic Estimates

### Photo uploads

Each active user uploads 1 photo per day:

1,000,000 uploads per day

Uploads per second:

1,000,000 ÷ 86,400 ≈ 12 uploads/second

Peak traffic (5×):

12 × 5 = approximately 60 uploads/second


### Feed views

Each active user views 50 feed pages per day:

1,000,000 × 50 = 50,000,000 feed views per day

Average feed views per second:

50,000,000 ÷ 86,400 ≈ 579 views/second

Peak traffic (5×):

579 × 5 ≈ 2,895 views/second


## Storage Estimates

Each uploaded photo:

2 MB photo + 50 KB thumbnail

Approximately:

2.05 MB per photo


Daily storage:

1,000,000 × 2.05 MB

≈ 2.05 TB per day


Yearly storage:

2.05 TB × 365

≈ 748 TB per year


## Read or Write Heavy?

SnapShare is a read-heavy system.

Although users upload many photos, feed browsing creates much higher traffic because every active user views many photos every day. The system should therefore optimise for fast reads using caching, CDNs and read replicas.


## Why Photos Should Not Be Stored in the Database

Photo files should not be stored directly in the database because large binary files increase database size and make backups, replication and queries slower.

Photos should be stored in object storage, while the database stores metadata such as photo IDs, usernames, timestamps and storage locations.


# Architecture Diagram

```
                 Users
                   |
                   |
                  CDN      
                   |
             Load Balancer
                   |
        ----------------------
        |         |          |
    App Server App Server App Server
        |
        |
      Cache
        |
        |
    Database -------- Read Replica
        |
        |
   Object Storage
        |
        |
      Queue
        |
        |
 Thumbnail Worker
```


# Components

## CDN

The CDN stores frequently accessed photos closer to users to reduce latency and decrease load on servers.

## Load Balancer

The load balancer distributes incoming requests across multiple application servers.

## App Servers

Application servers handle user actions such as uploads, authentication and generating feeds.

## Cache

The cache stores frequently requested data such as popular feeds to reduce database reads.

## Database

The database stores structured information such as users, followers, photo metadata and relationships.

## Read Replica

The read replica handles additional database read traffic without affecting the main database.

## Object Storage

Object storage stores the actual photo and thumbnail files efficiently and cheaply.

## Queue

The queue stores background jobs so slow tasks do not block user requests.

## Thumbnail Worker

The thumbnail worker processes queued photos and creates smaller versions for faster loading.


# Photo Upload Flow

1. A user selects a photo and uploads it through the application.
2. The request reaches the load balancer.
3. An app server receives the upload request.
4. The app server stores the original photo in object storage.
5. The app server saves photo metadata in the database.
6. A thumbnail creation job is added to the queue.
7. A thumbnail worker receives the job.
8. The worker creates a smaller thumbnail version.
9. The thumbnail is stored in object storage.
10. The photo becomes available in user feeds through the CDN.


# Trade-offs

## Object Storage vs Database Storage

Using object storage improves scalability and reduces database size, but requires managing another service and keeping references between the database and stored files.


## Cache Speed vs Data Freshness

Caching improves performance and reduces database load, but cached information may become temporarily outdated.


## More Servers vs Cost

Adding more app servers improves reliability and handles higher traffic, but increases infrastructure costs.